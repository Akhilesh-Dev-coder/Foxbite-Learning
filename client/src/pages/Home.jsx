import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Book,
  Layers,
  Star,
  Check,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  TrendingUp,
  Zap,
  Coins,
  Smartphone,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="space-y-16 md:space-y-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none -z-50 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] animate-blob" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] animate-blob animate-delay-200" />
      </div>

      {/* Hero Section */}
      <section
        id="hero"
        className="pt-16 lg:pt-24 text-center space-y-8 max-w-5xl mx-auto relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm text-primary font-semibold text-sm mb-4"
        >
          <Sparkles size={16} className="text-yellow-500" />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Premium Education for +1 & +2 Students
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-extrabold text-dark leading-[1.1] tracking-tight px-2"
        >
          Unlock Your <br className="hidden md:block" />
          <span className="relative inline-block mt-2 md:mt-0">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-secondary animate-gradient-x">
              Full Potential
            </span>
            <svg
              className="absolute w-full h-2 md:h-3 -bottom-1 left-0 text-primary/20 z-0"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0 5 Q 50 10 100 5"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
              />
            </svg>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-light px-4"
        >
          Stop struggling with scattered notes. Get{" "}
          <span className="font-semibold text-dark">FOXBITE</span> premium
          curated study materials and secure your academic success today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-5 pt-8"
        >
          <a
            href="#courses"
            className="group relative px-8 py-4 bg-dark text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              Start Learning{" "}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <div className="flex items-center justify-center gap-4 px-6 text-sm font-semibold text-gray-500">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] overflow-hidden"
                >
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
                      i + 10
                    }`}
                    alt="user"
                  />
                </div>
              ))}
            </div>
            <div>
              <div className="flex text-yellow-500">
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
              </div>
              <span>Trusted by 1000+ Students</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureBox
            icon={<Layers className="w-8 h-8 text-white" />}
            color="bg-blue-500"
            title="Syllabus Structured"
            desc="Content strictly aligned with +1 & +2 State Syllabus. No fluff, just what you need to score high."
            delay={0.1}
          />
          <FeatureBox
            icon={<Sparkles className="w-8 h-8 text-white" />}
            color="bg-purple-500"
            title="Premium Quality"
            desc="Verified by top educators. High-resolution vector PDFs that are crisp and easy to read."
            delay={0.2}
          />
          <FeatureBox
            icon={<ShieldCheck className="w-8 h-8 text-white" />}
            color="bg-pink-500"
            title="Secure & Private"
            desc="Your purchases are linked to your identity. Our custom viewer ensures zero piracy."
            delay={0.3}
          />
        </div>
      </section>

      {/* Why Us Section */}
      <section
        id="why-us"
        className="py-12 md:py-20 bg-gray-50/50 scroll-mt-20"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles size={14} /> The Foxbite Advantage
            </div>
            <h2 className="text-4xl font-display font-bold text-dark mb-4">
              Why Toppers Choose Us?
            </h2>
            <p className="text-gray-500 text-lg">
              We don't just provide notes; we provide a complete ecosystem for
              excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureBox
              icon={<Book size={24} className="text-white" />}
              title="Curated by Experts"
              desc="Notes prepared by state rank holders and experienced teachers to ensure 100% syllabus coverage."
              color="bg-blue-500"
              delay={0}
            />
            <FeatureBox
              icon={<Layers size={24} className="text-white" />}
              title="Exam-Oriented Layout"
              desc="Structured specifically for last-minute revision. Keywords highlighted for maximum retention."
              color="bg-purple-500"
              delay={0.1}
            />
            <FeatureBox
              icon={<ShieldCheck size={24} className="text-white" />}
              title="Secure & Private"
              desc="Your data is encrypted. Our custom PDF viewer ensures no unauthorized sharing of your premium content."
              color="bg-pink-500"
              delay={0.2}
            />
            <FeatureBox
              icon={<Zap size={24} className="text-white" />}
              title="Instant Access"
              desc="No waiting time. Get immediate access to all study materials as soon as your payment is verified."
              color="bg-amber-500"
              delay={0.3}
            />
            <FeatureBox
              icon={<Coins size={24} className="text-white" />}
              title="Unbeatable Value"
              desc="Premium quality education shouldn't be expensive. Get everything for less than the price of a snack."
              color="bg-emerald-500"
              delay={0.4}
            />
            <FeatureBox
              icon={<Smartphone size={24} className="text-white" />}
              title="Study Anywhere"
              desc="Fully responsive design. Read your notes on the bus, in the park, or from the comfort of your bed."
              color="bg-indigo-500"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="scroll-mt-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-dark">
            Premium Courses
          </h2>
          <p className="text-xl text-gray-500">
            Invest in your future for less than the price of a coffee.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto px-4">
          <CourseCard
            title="+1 Plus One Notes"
            price="₹22"
            batch="+1 State Syllabus"
            features={[
              "Complete Physics Notes",
              "Chemistry Key Points",
              "Maths Formula Sheets",
              "Previous Year Q&A",
              "Exam Cheatsheets",
            ]}
            color="blue"
            popular={false}
          />
          <CourseCard
            title="+2 Plus Two Notes"
            price="₹22"
            batch="+2 State Syllabus"
            features={[
              "Advanced Physics Concepts",
              "Organic Chemistry Guide",
              "Calculus Mastery",
              "Exam Strategy Layout",
              "Top Scorer Secrets",
            ]}
            color="purple"
            popular={true}
          />
        </div>
      </section>

      {/* Reviews Section */}
      <section
        id="reviews"
        className="scroll-mt-20 py-16 md:py-32 bg-white/50 backdrop-blur-sm relative z-0"
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest mb-4">
            <TrendingUp size={14} /> Proven Results
          </div>
          <h2 className="text-4xl font-display font-bold text-dark">
            Student Voices
          </h2>
          <p className="text-gray-500 mt-4 text-lg">
            Don't just take our word for it.
          </p>
        </div>

        {/* Marquee Effect Container could go here, for now Grid */}
        <div className="grid md:grid-cols-3 gap-6 container mx-auto px-4">
          {/* First Column */}
          <div className="space-y-6">
            <ReviewCard
              name="Hafaan"
              role="+2 Science"
              text="Foxbite Learning is a reliable, well‑designed platform that offers clear, exam‑focused support for school students. I’ve used it since Class 10 and still depend on it in Plus Two Biology because of its consistency. Its simplified explanations, structured notes, and practical tools make learning and revision easier. Unlike many platforms that focus on promotion, Foxbite stays professional and genuinely helpful. It’s a dependable, student‑friendly resource that I confidently recommend "
            />
            <ReviewCard
              name="Neha"
              role="+2 Science"
              text="The quality content and easy accessibility have made a positive impact on my learning journey. Deeply greatful for the support that you provides to the students like me..."
            />
            <ReviewCard
              name="Anaswara v v"
              role="+1 Science"
              text="Thank you for the previous year question papers, It's very useful. I kindly request to provide question papers earlier, so that we can prepare more for exams.I appreciate your team's efforts🤝."
            />
          </div>
          {/* Second Column (Offset) */}
          <div className="space-y-6 md:pt-12">
            <ReviewCard
              name="Sayidevadarsh"
              role="+2 Science"
              text="Very helpful to study the imp topics"
            />
            <ReviewCard
              name="Mohammed F."
              role="+2 Humanities"
              text="Exam preparation became 10x easier with these curated notes."
            />
            <ReviewCard
              name="Diya"
              role="+1 Science"
              text="Thankyou foxbite for giving helpfull predictions..."
            />
          </div>
          {/* Third Column */}
          <div className="space-y-6">
            <ReviewCard
              name="Karthik"
              role="+1 Science"
              text="Exam prediction king, kazhinja public exm prediction muthal aanu foxbite groupil kayarie Nmde 10th exam majority qns um foxbite paranjatha vannitundayirunne"
            />
            <ReviewCard
              name="Sneha Pillai"
              role="+1 Science"
              text="Chapter-wise tests and NCERT focus helped me build a rock-solid foundation. My confidence in exams grew exponentially thanks to Foxbite's systematic approach"
            />
            <ReviewCard
              name="Prithvi"
              role="+2 Science"
              text="Great easy notes...sherikkum helpfull aan and ipo christmas exam notes are very well designed and easy."
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="max-w-3xl mx-auto scroll-mt-20 px-6 relative z-10 py-12 bg-white/40 backdrop-blur-sm rounded-3xl mt-12 mb-20 border border-white/50"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-dark">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-4">
          <FaqItem
            q="How do I get access to the notes?"
            a="Simply sign up, select your batch, and make the payment of ₹22. Once admin approves, you get instant access."
          />
          <FaqItem
            q="Can I download the PDFs?"
            a="No, to protect copyright and prevent piracy, we provide a high-quality secure viewer within the app."
          />
          <FaqItem
            q="Is this for CBSE or State Syllabus?"
            a="Currently, our specialized content is tailored strictly for +1 and +2 State Syllabus students."
          />
          <FaqItem
            q="What if I have payment issues?"
            a="Use the 'Live Support' button in the sidebar to chat with us on WhatsApp. We resolve issues instantly."
          />
          <FaqItem
            q="Can I switch batches later?"
            a="Yes, you can request a batch change through your dashboard or by contacting support."
          />
        </div>
      </section>

      {/* Footer CTA */}
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to top your class?</h2>
        <Link
          to="/signup"
          className="inline-block px-10 py-4 bg-primary text-white rounded-full font-bold shadow-xl shadow-primary/30 hover:scale-105 transition-transform"
        >
          Join Foxbite Now
        </Link>
      </div>
    </div>
  );
};

// Components

const FeatureBox = ({ icon, title, desc, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
  >
    <div
      className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-6 transition-transform`}
    >
      {icon}
    </div>
    <h3 className="text-xl font-bold text-dark mb-3">{title}</h3>
    <p className="text-gray-500 leading-relaxed font-light">{desc}</p>
  </motion.div>
);

const CourseCard = ({ title, price, batch, features, color, popular }) => {
  const theme =
    color === "blue"
      ? "from-blue-500 to-indigo-600"
      : "from-pink-500 to-purple-600";
  const shadow = color === "blue" ? "shadow-blue-200" : "shadow-purple-200";
  const textColor = color === "blue" ? "text-blue-600" : "text-purple-600";
  const bgColor = color === "blue" ? "bg-blue-50" : "bg-purple-50";

  return (
    <div
      className={`relative p-1 rounded-3xl ${
        popular
          ? "bg-gradient-to-b from-yellow-400 via-yellow-200 to-yellow-400 p-[2px]"
          : "bg-white border border-gray-100"
      } h-full`}
    >
      {popular && (
        <div className="absolute top-0 right-0 left-0 -mt-4 text-center">
          <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Bestseller
          </span>
        </div>
      )}
      <div
        className={`bg-white rounded-[22px] p-8 h-full flex flex-col relative overflow-hidden ${
          popular ? "" : "shadow-xl " + shadow
        }`}
      >
        {/* Background blob */}
        <div
          className={`absolute -top-20 -right-20 w-64 h-64 ${bgColor} rounded-full blur-3xl opacity-50`}
        />

        <div className="relative z-10 flex-1">
          <h3 className="text-2xl font-bold text-dark mb-1">{title}</h3>
          <p className="text-gray-500 mb-6 font-medium">{batch}</p>
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-5xl font-extrabold text-dark tracking-tight">
              {price}
            </span>
            <span className="text-gray-400 font-medium">/ lifetime</span>
          </div>

          <ul className="space-y-4 mb-8">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <div
                  className={`mt-1 p-0.5 rounded-full ${bgColor} ${textColor}`}
                >
                  <Check size={14} strokeWidth={3} />
                </div>
                <span className="text-gray-600 font-medium">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          to="/dashboard"
          className={`block w-full py-4 rounded-xl font-bold text-center text-white bg-gradient-to-r ${theme} hover:shadow-lg hover:scale-[1.02] transition-all duration-300 relative z-10`}
        >
          Get Instant Access
        </Link>
      </div>
    </div>
  );
};

const ReviewCard = ({ name, role, text }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    transition={{ duration: 0.3 }}
    className="p-6 bg-white rounded-2xl border border-gray-50 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all"
  >
    <div className="flex gap-1 text-yellow-400 mb-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={14} fill="currentColor" />
      ))}
    </div>
    <p className="text-gray-700 leading-relaxed italic mb-4 text-sm font-medium">
      "{text}"
    </p>
    <div className="flex items-center gap-3 mt-auto">
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold">
        {name[0]}
      </div>
      <div>
        <h4 className="font-bold text-dark text-xs uppercase tracking-wide">
          {name}
        </h4>
        <span className="text-[10px] text-gray-400 font-bold">{role}</span>
      </div>
    </div>
  </motion.div>
);

const FaqItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left font-bold text-dark transition-colors"
      >
        {q}
        <div
          className={`p-1 rounded-full ${
            isOpen ? "bg-primary text-white" : "bg-gray-50 text-gray-400"
          } transition-colors`}
        >
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="p-5 pt-0 text-gray-600 text-base leading-relaxed">
          {a}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
