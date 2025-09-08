import { CheckCircle, Star, Users, Calendar, Shield, Zap } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Calendar,
      title: "Smart Event Discovery",
      description: "AI-powered recommendations based on your interests, schedule, and campus activities.",
      highlight: "Never miss relevant events",
    },
    {
      icon: Users,
      title: "Campus Community",
      description: "Connect with students from your college and discover events from verified organizations.",
      highlight: "Student-verified events only",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security. Only see events from your campus.",
      highlight: "Campus-exclusive access",
    },
    {
      icon: Zap,
      title: "Instant Notifications",
      description: "Get real-time updates about event changes, reminders, and new events you might like.",
      highlight: "Smart notification system",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything you need for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
              campus events
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built specifically for students, by students. Our platform makes discovering and 
            managing campus events effortless and engaging.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-200"
            >
              {/* Icon */}
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {feature.description}
              </p>

              {/* Highlight */}
              <div className="flex items-center text-primary-600 font-medium text-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                {feature.highlight}
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Student Benefits */}
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Why students love RSVP
              </h3>
              <div className="space-y-4">
                {[
                  "Free for all students with .edu email verification",
                  "Only see events happening at your campus",
                  "Smart calendar integration with Google Calendar",
                  "Earn points and badges for attending events",
                  "Connect with like-minded students",
                  "Get notified about last-minute changes"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              {/* Student Testimonial Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600 text-sm">5.0 rating</span>
                </div>
                <blockquote className="text-gray-800 mb-4">
                  "RSVP has completely changed how I discover events on campus. I've attended 
                  more events this semester than in my entire college career!"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold">
                    P
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold text-gray-900">Priya Sharma</div>
                    <div className="text-sm text-gray-600">Computer Science, IIT Delhi</div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-200 rounded-full opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary-200 rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
