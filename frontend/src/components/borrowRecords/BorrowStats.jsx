import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, BookMarked, CheckCircle2 } from "lucide-react";

function BorrowStats({ records }) {

  const totalRecords = records.length;

  const borrowedBooks = records.filter(
    (record) => record.status === "Borrowed"
  ).length;

  const returnedBooks = records.filter(
    (record) => record.status === "Returned"
  ).length;

  const stats = [
    {
      title: "Total Records",
      value: totalRecords,
      subtitle: "All borrowing history",
      icon: <BookOpen size={30} />,
    },
    {
      title: "Currently Borrowed",
      value: borrowedBooks,
      subtitle: "Books not yet returned",
      icon: <BookMarked size={30} />,
    },
    {
      title: "Returned Books",
      value: returnedBooks,
      subtitle: "Successfully returned",
      icon: <CheckCircle2 size={30} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">

      {stats.map((stat, index) => (

        <BorrowStatCard
          key={index}
          title={stat.title}
          value={stat.value}
          subtitle={stat.subtitle}
          icon={stat.icon}
          delay={index * 0.15}
        />

      ))}

    </div>
  );
}

function BorrowStatCard({
  title,
  value,
  subtitle,
  icon,
  delay,
}) {

  const [count, setCount] = useState(0);

  useEffect(() => {

    let start = 0;

    const duration = 800;

    const increment = value / (duration / 20);

    const timer = setInterval(() => {

      start += increment;

      if (start >= value) {

        setCount(value);

        clearInterval(timer);

      } else {

        setCount(Math.floor(start));

      }

    }, 20);

    return () => clearInterval(timer);

  }, [value]);

  return (

    <motion.div

      initial={{
        opacity: 0,
        scale: 0.9,
      }}

      animate={{
        opacity: 1,
        scale: 1,
      }}

      transition={{
        duration: 0.5,
        delay,
      }}

      whileHover={{
        y: -8,
        scale: 1.03,
      }}

      className="
      relative
      overflow-hidden
      rounded-3xl
      p-6
      bg-gradient-to-br
      from-[#6B4423]
      via-[#8B5E34]
      to-[#D4A373]
      text-white
      shadow-xl
      "

    >

      <motion.div

        animate={{
          rotate: 360,
        }}

        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}

        className="
        absolute
        -top-12
        -right-12
        w-40
        h-40
        rounded-full
        bg-white/10
        "

      />

      <div
        className="
        relative
        w-16
        h-16
        rounded-2xl
        bg-white/20
        backdrop-blur-md
        flex
        items-center
        justify-center
        mb-5
        "
      >
        {icon}
      </div>

      <p className="text-white/80 text-sm">
        {title}
      </p>

      <h2 className="text-5xl font-bold mt-2">
        {count}
      </h2>

      <p className="mt-3 text-sm text-white/80">
        {subtitle}
      </p>

    </motion.div>

  );
}

export default BorrowStats;