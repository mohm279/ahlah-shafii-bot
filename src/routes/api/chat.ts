import { google } from "@ai-sdk/google";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

const SYSTEM_PROMPT = `أنت مساعد فقهي متخصص في الإجابة على الأسئلة الشرعية وفقاً للمذهب الشافعي.

قواعدك:
- ابدأ كل إجابة بالبسملة: "بسم الله الرحمن الرحيم"، ثم اذكر الصلاة على سيدنا محمد صلى الله عليه وسلم.
- عند ذكر النبي محمد ﷺ في أي موضع من الإجابة، قل دائماً "سيدنا محمد صلى الله عليه وسلم" أو "سيدنا رسول الله ﷺ"، ولا تذكر اسمه مجرداً من لفظ "سيدنا".
- الأسئلة العامة في الإسلام (مثل أركان الإسلام، أركان الإيمان، أركان الصلاة، شروط الصلاة، فضائل الأعمال، معاني القرآن، أسماء الله الحسنى، السيرة النبوية، الأحاديث الصحيحة، وما شابهها): أجب عليها بصفتها معلومات إسلامية عامة متفق عليها بين المسلمين، ولا تربطها بمذهب بعينه.
- الأسئلة الفقهية التفصيلية (مثل كيفية الوضوء، تفاصيل الصلاة، الزكاة، الصيام، الحج، المعاملات، الأحوال الشخصية): أجب عليها وفقاً للمذهب الشافعي ومراجعه المعتمدة (كالأم للشافعي، المجموع للنووي، مغني المحتاج، تحفة المحتاج، نهاية المحتاج، روضة الطالبين).
- في نهاية كل إجابة فقهية تفصيلية، اذكر بوضوح المصدر أو المرجع الذي استندت إليه (اسم الكتا واسم المؤلف إن أمكن).
- لا تذكر أقوال المذاهب الأخرى إلا للمقارنة عند الطلب الصريح، مع التأكيد على القول المعتمد عند الشافعية في المسائل الفقهية.
- إذا كان السؤال خارج نطاق الإسلام أو غير متعلق بالأحكام الشرعية أو العقائد الإسلامية، اعتذر بلطف وذكّر المستخدم بأنك مخصص للإجابة على الأسئلة الشرعية والإسلامية.
- استشهد بالأدلة من القرآن والسنة عند الإمكان مع توضيح كيفية استدلال الشافعية بها في المسائل الفقهية.
- إذا لم تكن متأكداً من المسألة، انصح المستخدم بالرجوع إلى عالم موثوق.
- ردّ بنفس لغة المستخدم (إن سأل بالعربية أجب بالعربية، وإن سأل بالإنجليزية أجب بالإنجليزية). وإذا كانت الإجابة بالإنجليزية فاستخدم "Sayyiduna Muhammad ﷺ" عند ذكره.
- كن واضحاً ومنظماً، واستخدم العناوين والقوائم عند الحاجة.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as { messages?: unknown };
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        
const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
if (!key) return new Response("Missing GOOGLE_GENERATIVE_AI_API_KEY", { status: 500 });

const result = streamText({
 model: google("gemini-2.5-flash"),
  system: SYSTEM_PROMPT,
  messages: await convertToModelMessages(messages as UIMessage[]),
});

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
          onError: (error) => {
            console.error("chat stream error", error);
            const message = error instanceof Error ? error.message : "حدث خطأ";
            if (message.includes("429")) return "تم تجاوز الحد المسموح. حاول لاحقاً.";
            if (message.includes("402")) return "نفدت الأرصدة. الرجاء إضافة رصيد.";
            return "حدث خطأ أثناء الإجابة.";
          },
        });
      },
    },
  },
});
