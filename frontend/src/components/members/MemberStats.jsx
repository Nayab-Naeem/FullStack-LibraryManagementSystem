import { Users, UserPlus, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";


function AnimatedStatCard({ title, value, description, icon: Icon }) {

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


    },20);



    return () => clearInterval(timer);


  },[value]);



  return (

    <motion.div

      initial={{
        opacity:0,
        scale:0.8
      }}

      animate={{
        opacity:1,
        scale:1
      }}

      transition={{
        duration:0.5
      }}


      whileHover={{
        y:-8,
        scale:1.03
      }}

    >


      <div
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


        {/* Background Circle */}

        <motion.div

          animate={{
            rotate:360
          }}

          transition={{
            duration:12,
            repeat:Infinity,
            ease:"linear"
          }}

          className="
          absolute
          -right-12
          -top-12
          w-40
          h-40
          rounded-full
          bg-white/10
          "

        />



        <motion.div

          animate={{
            y:[0,-10,0]
          }}

          transition={{
            duration:3,
            repeat:Infinity
          }}


          className="
          relative
          w-16
          h-16
          rounded-2xl
          bg-white/20
          flex
          items-center
          justify-center
          backdrop-blur-md
          mb-5
          "

        >

          <Icon size={32}/>

        </motion.div>




        <p className="text-white/80 text-sm">
          {title}
        </p>


        <h2
          className="
          text-5xl
          font-bold
          mt-2
          "
        >
          {count}
        </h2>



        <p
          className="
          mt-3
          text-sm
          text-white/80
          "
        >
          {description}
        </p>


      </div>


    </motion.div>

  );

}




function MemberStats({ members }) {


  const totalMembers = members.length;



  const joinedThisMonth = members.filter((member)=>{

    const date = new Date(member.joined_date);

    const now = new Date();


    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );

  }).length;




  const joinedToday = members.filter((member)=>{

    return (
      new Date(member.joined_date)
      .toDateString() === new Date().toDateString()
    );


  }).length;




  const stats = [

    {
      title:"Total Members",
      value:totalMembers,
      description:"Registered library members",
      icon:Users
    },


    {
      title:"Joined This Month",
      value:joinedThisMonth,
      description:"New members this month",
      icon:UserPlus
    },


    {
      title:"Joined Today",
      value:joinedToday,
      description:"Members added today",
      icon:CalendarDays
    }

  ];



  return (

    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-3
      gap-6
      mb-8
      "
    >

      {
        stats.map((stat,index)=>(

          <AnimatedStatCard

            key={index}

            title={stat.title}

            value={stat.value}

            description={stat.description}

            icon={stat.icon}

          />

        ))
      }


    </div>

  );

}


export default MemberStats;