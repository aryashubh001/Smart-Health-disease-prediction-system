import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Heart, 
  Brain, 
  Shield, 
  Users, 
  Award, 
  Target,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github
} from 'lucide-react';

export function AboutUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const features = [
    {
      icon: Brain,
      title: 'Advanced AI Technology',
      description: 'State-of-the-art machine learning models trained on extensive medical datasets for accurate predictions.'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your medical data is encrypted and secure. We follow strict HIPAA compliance standards.'
    },
    {
      icon: Users,
      title: 'Expert Medical Advisory',
      description: 'Our AI models are developed in consultation with practicing physicians and medical specialists.'
    },
    {
      icon: Award,
      title: 'Proven Accuracy',
      description: 'Over 90% accuracy in disease prediction with continuous model improvement and validation.'
    }
  ];

  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face',
      bio: 'Board-certified physician with 15+ years in digital health and AI applications in medicine.'
    },
    {
      name: 'Alex Chen',
      role: 'Head of AI Research',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      bio: 'PhD in Machine Learning with expertise in medical image analysis and predictive modeling.'
    },
    {
      name: 'Dr. Priya Patel',
      role: 'Dermatology Advisor',
      image: 'https://images.unsplash.com/photo-1594824388853-e513b89c5c2c?w=300&h=300&fit=crop&crop=face',
      bio: 'Dermatologist specializing in AI-assisted skin condition diagnosis and treatment protocols.'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Data Science Lead',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Expert in healthcare data analytics with focus on bias reduction and model interpretability.'
    }
  ];

  const stats = [
    { value: '50,000+', label: 'Patients Served', icon: Users },
    { value: '95%', label: 'Average Accuracy', icon: Target },
    { value: '24/7', label: 'Availability', icon: Shield },
    { value: '15+', label: 'Medical Conditions', icon: Heart }
  ];

  const milestones = [
    { year: '2022', title: 'Company Founded', description: 'Started with a vision to democratize AI-powered healthcare diagnostics' },
    { year: '2023', title: 'First AI Model Launch', description: 'Released heart disease prediction model with 92% accuracy' },
    { year: '2023', title: 'Skin Analysis Added', description: 'Introduced computer vision for dermatological condition detection' },
    { year: '2024', title: 'Odisha Partnership', description: 'Partnered with local healthcare providers for regional medical recommendations' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="py-20 px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div className="space-y-6" variants={itemVariants}>
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge variant="secondary" className="mb-4">About HealthAI</Badge>
                </motion.div>
                <motion.h1 
                  className="text-4xl lg:text-5xl font-bold mb-4"
                  variants={itemVariants}
                >
                  Revolutionizing Healthcare with
                  <span className="text-primary block">Artificial Intelligence</span>
                </motion.h1>
                <motion.p 
                  className="text-xl text-muted-foreground"
                  variants={itemVariants}
                >
                  We're on a mission to make advanced medical diagnostics accessible to everyone through 
                  cutting-edge AI technology and user-friendly interfaces.
                </motion.p>
              </div>
              
              <motion.div 
                className="grid grid-cols-2 gap-4"
                variants={containerVariants}
              >
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="text-center p-4 bg-muted/20 rounded-lg"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div 
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 mb-2 mx-auto"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <stat.icon className="w-4 h-4 text-primary" />
                    </motion.div>
                    <div className="font-bold text-lg">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1659353888906-adb3e0041693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGhlYWx0aGNhcmUlMjBwcm9mZXNzaW9uYWxzfGVufDF8fHx8MTc1Njg4MDE2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Healthcare Professionals"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Mission & Vision</h2>
            <p className="text-xl text-muted-foreground">
              Bridging the gap between advanced medical technology and accessible healthcare
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To democratize access to advanced medical diagnostics by providing AI-powered health 
                  assessments that are accurate, affordable, and accessible to everyone, regardless of 
                  their location or economic status.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A world where early disease detection and prevention are available to all, where AI 
                  assistants support healthcare professionals, and where patients are empowered with 
                  knowledge about their health.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Makes Us Different</h2>
            <p className="text-xl text-muted-foreground">
              Our commitment to accuracy, privacy, and accessibility sets us apart
            </p>
          </div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <motion.div 
                      className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <feature.icon className="w-8 h-8 text-primary" />
                    </motion.div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground">
              Experts in medicine, AI, and healthcare technology working together
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground">
              Key milestones in our mission to transform healthcare
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {milestone.year}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values & Commitments */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                title: 'Patient-First Approach',
                description: 'Every decision we make prioritizes patient safety, privacy, and well-being'
              },
              {
                title: 'Scientific Rigor',
                description: 'Our AI models are built on solid scientific foundations and peer-reviewed research'
              },
              {
                title: 'Transparency',
                description: 'We believe in clear communication about our methods, limitations, and capabilities'
              },
              {
                title: 'Continuous Improvement',
                description: 'We constantly refine our models and processes based on new data and feedback'
              },
              {
                title: 'Accessibility',
                description: 'Healthcare technology should be available to everyone, regardless of their circumstances'
              }
            ].map((value, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-card rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl text-muted-foreground">
              Have questions or want to collaborate? We'd love to hear from you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle>Email Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">General inquiries and support</p>
                <Button variant="outline">contact@healthai.com</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Phone className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle>Call Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Speak with our team</p>
                <Button variant="outline">+1 (555) 123-4567</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle>Visit Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Our headquarters</p>
                <Button variant="outline">Bhubaneswar, Odisha</Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="icon">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}