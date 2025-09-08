import { Calendar, Users, Star, TrendingUp } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Active Students",
      description: "Students actively using RSVP across India",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Calendar,
      value: "2,500+",
      label: "Events Created",
      description: "Events organized through our platform monthly",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Star,
      value: "4.9/5",
      label: "Student Rating",
      description: "Average rating from student reviews",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Event Attendance",
      description: "Average attendance rate for RSVP events",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const testimonials = [
    {
      content: "RSVP made it so easy to find tech meetups and hackathons on campus. I've made tons of connections!",
      author: "Arjun Patel",
      role: "Computer Science Student",
      college: "IIT Bombay",
      avatar: "A",
    },
    {
      content: "As an event organizer, RSVP streamlined our registration process and boosted attendance by 40%.",
      author: "Sneha Reddy",
      role: "Cultural Secretary",
      college: "BITS Pilani",
      avatar: "S",
    },
    {
      content: "The smart notifications feature is amazing. I never miss important events anymore!",
      author: "Rahul Singh",
      role: "MBA Student",
      college: "IIM Ahmedabad",
      avatar: "R",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Trusted by students
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
              across India
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From IITs to state universities, students nationwide are using RSVP to 
            discover events and build stronger campus communities.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} mb-6`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-800 mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12">
            What students are saying
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.college}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campus Coverage */}
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-8 lg:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Available at 50+ campuses and growing
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We're expanding to new colleges every month. Don't see your campus? 
            Let us know and we'll prioritize adding it!
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            {[
              "IIT Delhi", "IIT Bombay", "IIT Madras", "BITS Pilani", "DU", "JNU",
              "IIM Ahmedabad", "NIT Trichy", "VIT Vellore", "Manipal University"
            ].map((college, index) => (
              <div
                key={index}
                className="bg-white px-4 py-2 rounded-lg font-medium shadow-sm"
              >
                {college}
              </div>
            ))}
            <div className="bg-primary-100 text-primary-600 px-4 py-2 rounded-lg font-medium">
              +40 more
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
