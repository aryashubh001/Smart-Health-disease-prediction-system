import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Heart, 
  FileText, 
  Brain, 
  Shield, 
  Zap, 
  Users, 
  Award,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

type Page = 'landing' | 'predict' | 'reports' | 'about';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
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
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const features = [
    {
      icon: Heart,
      title: 'Disease Prediction',
      description: 'AI-powered analysis of medical data to predict heart disease, diabetes, cancer, and kidney conditions',
      action: () => onNavigate('predict'),
      badge: 'CSV Based'
    },
    {
      icon: FileText,
      title: 'Smart Reports',
      description: 'Generate comprehensive PDF reports with predictions, accuracy metrics, and medical advice',
      action: () => onNavigate('reports'),
      badge: 'PDF Export'
    }
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Users Helped' },
    { icon: Brain, value: '95%', label: 'AI Accuracy' },
    { icon: Award, value: '24/7', label: 'Available' },
    { icon: Shield, value: '100%', label: 'Secure' }
  ];

  const benefits = [
    'Quick self-checkups for patients',
    'AI-assisted diagnostics for doctors',
    'Educational tool for students',
    'Research support for academics',
    'Odisha-focused medical recommendations'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <motion.div 
          className="container mx-auto max-w-6xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div className="space-y-8" variants={itemVariants}>
              <div className="space-y-4">
                <motion.div variants={itemVariants}>
                  <Badge variant="secondary" className="px-3 py-1">
                    <Zap className="w-3 h-3 mr-1" />
                    AI-Powered Healthcare
                  </Badge>
                </motion.div>
                <motion.h1 
                  className="text-4xl lg:text-6xl font-bold leading-tight"
                  variants={itemVariants}
                >
                  Your AI Health
                  <motion.span 
                    className="text-primary "
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Companion
                  </motion.span>
                </motion.h1>
                <motion.p 
                  className="text-xl text-muted-foreground max-w-lg"
                  variants={itemVariants}
                >
                  Get instant AI-powered health insights from medical data. 
                  Trusted by patients, doctors, and researchers.
                </motion.p>
              </div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                variants={itemVariants}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    onClick={() => onNavigate('predict')}
                    className="group"
                  >
                    Start Health Check
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => onNavigate('reports')}
                  >
                    View Reports
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-8 pt-4"
                variants={containerVariants}
              >
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="text-center"
                    variants={itemVariants}
                    whileHover={{ scale: 1.1 }}
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
                  src="https://images.unsplash.com/photo-1743767587687-9ebaac2b55e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoY2FyZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU2ODk4ODk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Healthcare Technology"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Cards */}
              <motion.div 
                className="absolute -top-4 -left-4 bg-card p-4 rounded-xl shadow-lg border"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center space-x-2">
                  <motion.div 
                    className="w-3 h-3 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                  <span className="text-sm font-medium">AI Analysis Active</span>
                </div>
              </motion.div>
              <motion.div 
                className="absolute -bottom-4 -right-4 bg-card p-4 rounded-xl shadow-lg border"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Secure & Private</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Comprehensive Health Analysis
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform offers multiple ways to analyze your health data
              and provide actionable insights.
            </p>
          </div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
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
                whileTap={{ scale: 0.95 }}
              >
                <Card 
                  className="group hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
                  onClick={feature.action}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <motion.div 
                        className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <feature.icon className="w-6 h-6 text-primary" />
                      </motion.div>
                      <Badge variant="outline">{feature.badge}</Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                    <Button variant="ghost" className="w-full mt-4 group-hover:bg-primary/10">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Who Can Benefit?
            </h2>
            <p className="text-xl text-muted-foreground">
              Our platform serves a diverse range of healthcare stakeholders
            </p>
          </div>

          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                className="flex items-center space-x-3 p-4 rounded-lg bg-muted/20"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: "var(--muted)",
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, delay: index * 0.2, repeat: Infinity, ease: "linear" }}
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                </motion.div>
                <span className="font-medium">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Button size="lg" onClick={() => onNavigate('about')}>
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}