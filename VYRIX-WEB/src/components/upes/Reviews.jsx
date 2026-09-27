import { motion } from "framer-motion";
import { Star } from "lucide-react";

const REVIEWS = [
  "As long as I have uploaded all my research papers and don't have to fish around for what all I researched and where it went, it already takes away half of the pain, or else half the time I would be going to my history search to find the information I had once found, just because I took a break for a few days, but if I put it in the repository I can't possibly miss it.",
  "I feel like research most of the times, specially for students, is very rushed — in that case yes, Vyrix is helpful in keeping tabs on what's done and what is left.",
  "Never really thought of an app for research, so the idea itself was interesting. All the small details and options, for adding files and links, were very helpful.",
  "The Roadmap, Flow repository and Workspace. Loved the range of customization in the native Vyrix document. Being able to add Canva/Figma files directly is such a cool feature. Being able to mark projects complete or incomplete, and sort projects in folders by priority.",
  "Having a repository is definitely a time-saver, but could be more efficient with the suggested improvements. The application is not unnecessarily complex, which is very user-friendly.",
  "Well, to look back — I had AI that I could use at an instant to find research papers related to the subject, and the fact that I could upload a lot of different types of files into one place. The to-do list being in the front space of the app really helped me stay focused, as I was eager to check something off the list.",
];

const REVIEW_COLUMNS = [REVIEWS.filter((_, i) => i % 2 === 0), REVIEWS.filter((_, i) => i % 2 === 1)];

function Stars({ rating }) {
  return (
    <div className="mb-3 flex gap-1">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} size={13} className="fill-accent text-accent" />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="mx-auto mt-12 max-w-[1000px] px-5 py-14 sm:px-8 sm:py-20 lg:mt-[100px]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Reviews
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-[13px] text-ink/70">
          Feedback based on Beta testing across India's leading design and
          innovation institutes, including NIFT, NID, and UPES.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
        {REVIEW_COLUMNS.map((column, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-4">
            {column.map((text, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl bg-black p-6 text-white shadow-[2px_3px_0_#cfcfcf]"
              >
                <Stars rating={columnIndex === 0 ? [5, 4, 4][i] : [4, 5, 4][i]} />
                <p className="text-[14px] leading-[1.45] text-white/90">{text}</p>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
