import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import { 
  Heart, 
  Activity, 
  MapPin, 
  Phone, 
  CheckCircle, 
  AlertTriangle,
  Brain,
  Download,
  Loader2
} from 'lucide-react';

interface PredictionResult {
  disease: string;
  prediction: 'Fit' | 'At Risk' | 'High Risk';
  accuracy: number;
  confidence: number;
  riskFactors: string[];
  recommendations: string[];
  doctors: {
    name: string;
    specialty: string;
    hospital: string;
    location: string;
    phone: string;
  }[];
}

export function DiseasePrediction() {
  const [selectedDisease, setSelectedDisease] = useState('');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const diseaseTypes = [
    { value: 'heart', label: 'Heart Disease', fields: ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang'] },
    { value: 'diabetes', label: 'Diabetes', fields: ['pregnancies', 'glucose', 'blood_pressure', 'skin_thickness', 'insulin', 'bmi', 'diabetes_pedigree', 'age'] },
    { value: 'cancer', label: 'Cancer Risk', fields: ['age', 'smoking', 'yellow_fingers', 'anxiety', 'peer_pressure', 'chronic_disease', 'fatigue', 'allergy', 'wheezing'] },
    { value: 'kidney', label: 'Kidney Disease', fields: ['age', 'blood_pressure', 'specific_gravity', 'albumin', 'sugar', 'red_blood_cells', 'pus_cell', 'bacteria'] },
    { value: 'stroke', label: 'Stroke Risk', fields: ['age', 'hypertension', 'heart_disease', 'avg_glucose_level', 'bmi', 'smoking_status', 'work_type', 'residence_type'] },
    { value: 'liver', label: 'Liver Disease', fields: ['age', 'gender', 'total_bilirubin', 'direct_bilirubin', 'alkaline_phosphotase', 'alamine_aminotransferase', 'aspartate_aminotransferase', 'total_proteins', 'albumin'] },
    { value: 'parkinson', label: 'Parkinson\'s Disease', fields: ['mdvp_fo', 'mdvp_fhi', 'mdvp_flo', 'mdvp_jitter', 'mdvp_shimmer', 'nhr', 'hnr', 'rpde', 'dfa'] },
    { value: 'alzheimer', label: 'Alzheimer\'s Risk', fields: ['age', 'gender', 'education_level', 'cognitive_test_score', 'functional_assessment', 'memory_complaints', 'behavioral_problems', 'adl_score'] },
    { value: 'osteoporosis', label: 'Osteoporosis Risk', fields: ['age', 'gender', 'hormones', 'weight', 'height', 'family_history', 'smoking', 'alcohol', 'exercise'] }
  ];

  const fieldLabels: Record<string, string> = {
    age: 'Age',
    sex: 'Sex (1: Male, 0: Female)',
    cp: 'Chest Pain Type (0-3)',
    trestbps: 'Resting Blood Pressure',
    chol: 'Cholesterol Level',
    fbs: 'Fasting Blood Sugar > 120 mg/dl (1: Yes, 0: No)',
    restecg: 'Resting ECG Results (0-2)',
    thalach: 'Maximum Heart Rate',
    exang: 'Exercise Induced Angina (1: Yes, 0: No)',
    pregnancies: 'Number of Pregnancies',
    glucose: 'Glucose Level',
    blood_pressure: 'Blood Pressure',
    skin_thickness: 'Skin Thickness',
    insulin: 'Insulin Level',
    bmi: 'BMI',
    diabetes_pedigree: 'Diabetes Pedigree Function',
    smoking: 'Smoking (1: Yes, 0: No)',
    yellow_fingers: 'Yellow Fingers (1: Yes, 0: No)',
    anxiety: 'Anxiety (1: Yes, 0: No)',
    peer_pressure: 'Peer Pressure (1: Yes, 0: No)',
    chronic_disease: 'Chronic Disease (1: Yes, 0: No)',
    fatigue: 'Fatigue (1: Yes, 0: No)',
    allergy: 'Allergy (1: Yes, 0: No)',
    wheezing: 'Wheezing (1: Yes, 0: No)',
    specific_gravity: 'Specific Gravity',
    albumin: 'Albumin Level',
    sugar: 'Sugar Level',
    red_blood_cells: 'Red Blood Cells (1: Normal, 0: Abnormal)',
    pus_cell: 'Pus Cell (1: Normal, 0: Abnormal)',
    bacteria: 'Bacteria (1: Present, 0: Absent)',
    hypertension: 'Hypertension (1: Yes, 0: No)',
    heart_disease: 'Heart Disease (1: Yes, 0: No)',
    avg_glucose_level: 'Average Glucose Level',
    smoking_status: 'Smoking Status (0: Never, 1: Former, 2: Current)',
    work_type: 'Work Type (0: Private, 1: Self-employed, 2: Govt, 3: Children, 4: Never worked)',
    residence_type: 'Residence Type (0: Rural, 1: Urban)',
    gender: 'Gender (1: Male, 0: Female)',
    total_bilirubin: 'Total Bilirubin',
    direct_bilirubin: 'Direct Bilirubin',
    alkaline_phosphotase: 'Alkaline Phosphotase',
    alamine_aminotransferase: 'Alamine Aminotransferase',
    aspartate_aminotransferase: 'Aspartate Aminotransferase',
    total_proteins: 'Total Proteins',
    mdvp_fo: 'MDVP Fo (Hz)',
    mdvp_fhi: 'MDVP Fhi (Hz)',
    mdvp_flo: 'MDVP Flo (Hz)',
    mdvp_jitter: 'MDVP Jitter (%)',
    mdvp_shimmer: 'MDVP Shimmer',
    nhr: 'NHR (Noise to Harmonics Ratio)',
    hnr: 'HNR (Harmonics to Noise Ratio)',
    rpde: 'RPDE',
    dfa: 'DFA',
    education_level: 'Education Level (Years)',
    cognitive_test_score: 'Cognitive Test Score',
    functional_assessment: 'Functional Assessment Score',
    memory_complaints: 'Memory Complaints (1: Yes, 0: No)',
    behavioral_problems: 'Behavioral Problems (1: Yes, 0: No)',
    adl_score: 'Activities of Daily Living Score',
    hormones: 'Hormones (1: Normal, 0: Abnormal)',
    weight: 'Weight (kg)',
    height: 'Height (cm)',
    family_history: 'Family History (1: Yes, 0: No)',
    alcohol: 'Alcohol Consumption (1: Yes, 0: No)',
    exercise: 'Regular Exercise (1: Yes, 0: No)'
  };

  const mockDoctors = {
    heart: [
      { name: 'Dr. Rajesh Kumar', specialty: 'Cardiologist', hospital: 'AIIMS Bhubaneswar', location: 'Bhubaneswar, Odisha', phone: '+91-674-2397000' },
      { name: 'Dr. Priya Mohanty', specialty: 'Cardiac Surgeon', hospital: 'Kalinga Hospital', location: 'Bhubaneswar, Odisha', phone: '+91-674-6677777' }
    ],
    diabetes: [
      { name: 'Dr. Subash Patra', specialty: 'Endocrinologist', hospital: 'Apollo Hospital', location: 'Bhubaneswar, Odisha', phone: '+91-674-7144444' },
      { name: 'Dr. Meera Das', specialty: 'Diabetologist', hospital: 'SUM Hospital', location: 'Bhubaneswar, Odisha', phone: '+91-674-2386300' }
    ],
    cancer: [
      { name: 'Dr. Arun Mishra', specialty: 'Oncologist', hospital: 'AIIMS Bhubaneswar', location: 'Bhubaneswar, Odisha', phone: '+91-674-2397000' },
      { name: 'Dr. Sushma Rath', specialty: 'Medical Oncologist', hospital: 'Kalinga Hospital', location: 'Bhubaneswar, Odisha', phone: '+91-674-6677777' }
    ],
    kidney: [
      { name: 'Dr. Biswajit Sahoo', specialty: 'Nephrologist', hospital: 'KIMS Hospital', location: 'Bhubaneswar, Odisha', phone: '+91-674-2725555' },
      { name: 'Dr. Anita Swain', specialty: 'Kidney Specialist', hospital: 'Apollo Hospital', location: 'Bhubaneswar, Odisha', phone: '+91-674-7144444' }
    ],
    stroke: [
      { name: 'Dr. Ramesh Chandra', specialty: 'Neurologist', hospital: 'AIIMS Bhubaneswar', location: 'Bhubaneswar, Odisha', phone: '+91-674-2397000' },
      { name: 'Dr. Sunita Pradhan', specialty: 'Stroke Specialist', hospital: 'KIMS Hospital', location: 'Bhubaneswar, Odisha', phone: '+91-674-2725555' }
    ],
    liver: [
      { name: 'Dr. Prasant Jena', specialty: 'Hepatologist', hospital: 'SUM Hospital', location: 'Bhubaneswar, Odisha', phone: '+91-674-2386300' },
      { name: 'Dr. Kavita Singh', specialty: 'Gastroenterologist', hospital: 'Apollo Hospital', location: 'Bhubaneswar, Odisha', phone: '+91-674-7144444' }
    ],
    parkinson: [
      { name: 'Dr. Niranjan Mishra', specialty: 'Movement Disorders Specialist', hospital: 'AIIMS Bhubaneswar', location: 'Bhubaneswar, Odisha', phone: '+91-674-2397000' },
      { name: 'Dr. Shyama Patra', specialty: 'Neurologist', hospital: 'Kalinga Hospital', location: 'Bhubaneswar, Odisha', phone: '+91-674-6677777' }
    ],
    alzheimer: [
      { name: 'Dr. Bijay Nayak', specialty: 'Geriatrician', hospital: 'SUM Hospital', location: 'Bhubaneswar, Odisha', phone: '+91-674-2386300' },
      { name: 'Dr. Rashmi Ranjan', specialty: 'Memory Disorders Specialist', hospital: 'KIMS Hospital', location: 'Bhubaneswar, Odisha', phone: '+91-674-2725555' }
    ],
    osteoporosis: [
      { name: 'Dr. Santosh Samal', specialty: 'Orthopedic Surgeon', hospital: 'Apollo Hospital', location: 'Bhubaneswar, Odisha', phone: '+91-674-7144444' },
      { name: 'Dr. Manasi Das', specialty: 'Endocrinologist', hospital: 'Kalinga Hospital', location: 'Bhubaneswar, Odisha', phone: '+91-674-6677777' }
    ]
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const simulatePrediction = async (): Promise<PredictionResult> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const diseaseConfig = diseaseTypes.find(d => d.value === selectedDisease);
    const predictions = ['Fit', 'At Risk', 'High Risk'] as const;
    const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];
    const accuracy = Math.floor(Math.random() * 10) + 85; // 85-95%
    const confidence = Math.floor(Math.random() * 20) + 75; // 75-95%

    const riskFactorsMap: Record<string, string[]> = {
      heart: ['High cholesterol', 'High blood pressure', 'Age factor', 'Family history'],
      diabetes: ['High glucose levels', 'BMI above normal', 'Age factor', 'Sedentary lifestyle'],
      cancer: ['Smoking history', 'Environmental factors', 'Genetic predisposition', 'Age factor'],
      kidney: ['High blood pressure', 'Protein in urine', 'Diabetes history', 'Age factor'],
      stroke: ['Hypertension', 'Heart disease', 'High glucose', 'Smoking', 'Age factor'],
      liver: ['High bilirubin', 'Elevated enzymes', 'Alcohol consumption', 'Viral infections'],
      parkinson: ['Voice tremor', 'Motor symptoms', 'Age factor', 'Genetic factors'],
      alzheimer: ['Cognitive decline', 'Memory problems', 'Age factor', 'Family history'],
      osteoporosis: ['Low bone density', 'Hormonal changes', 'Lack of exercise', 'Age factor']
    };

    const recommendationsMap: Record<string, string[]> = {
      heart: ['Regular cardio exercise', 'Low-sodium diet', 'Regular check-ups', 'Stress management'],
      diabetes: ['Monitor blood sugar daily', 'Balanced diet', 'Regular exercise', 'Weight management'],
      cancer: ['Avoid smoking', 'Regular screenings', 'Healthy diet', 'Limit alcohol consumption'],
      kidney: ['Stay hydrated', 'Low-protein diet', 'Control blood pressure', 'Regular kidney function tests'],
      stroke: ['Control blood pressure', 'Manage diabetes', 'Stop smoking', 'Regular exercise'],
      liver: ['Avoid alcohol', 'Healthy diet', 'Regular liver tests', 'Vaccination for hepatitis'],
      parkinson: ['Regular exercise', 'Speech therapy', 'Medication compliance', 'Physical therapy'],
      alzheimer: ['Cognitive exercises', 'Social engagement', 'Healthy diet', 'Regular medical follow-up'],
      osteoporosis: ['Calcium and Vitamin D', 'Weight-bearing exercise', 'Fall prevention', 'Bone density monitoring']
    };

    return {
      disease: diseaseConfig?.label || '',
      prediction: randomPrediction,
      accuracy,
      confidence,
      riskFactors: riskFactorsMap[selectedDisease] || [],
      recommendations: recommendationsMap[selectedDisease] || [],
      doctors: mockDoctors[selectedDisease as keyof typeof mockDoctors] || []
    };
  };

  const handlePredict = async () => {
    setIsLoading(true);
    try {
      const result = await simulatePrediction();
      setPrediction(result);
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedDiseaseConfig = diseaseTypes.find(d => d.value === selectedDisease);

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case 'Fit': return 'text-green-600';
      case 'At Risk': return 'text-yellow-600';
      case 'High Risk': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  const getPredictionIcon = (prediction: string) => {
    switch (prediction) {
      case 'Fit': return CheckCircle;
      case 'At Risk': return AlertTriangle;
      case 'High Risk': return AlertTriangle;
      default: return Activity;
    }
  };

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

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-2">Disease Prediction</h1>
        <p className="text-muted-foreground">
          Enter your medical data to get AI-powered health predictions
        </p>
      </motion.div>

      <motion.div 
        className="grid lg:grid-cols-2 gap-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Input Form */}
        <motion.div variants={itemVariants}>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Brain className="w-5 h-5" />
                </motion.div>
                Medical Data Input
              </CardTitle>
              <CardDescription>
                Select a disease type and enter your medical parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="disease-type">Disease Type</Label>
              <Select value={selectedDisease} onValueChange={setSelectedDisease}>
                <SelectTrigger>
                  <SelectValue placeholder="Select disease type to analyze" />
                </SelectTrigger>
                <SelectContent>
                  {diseaseTypes.map(disease => (
                    <SelectItem key={disease.value} value={disease.value}>
                      {disease.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedDiseaseConfig && (
              <div className="space-y-4">
                <Separator />
                <div className="grid sm:grid-cols-2 gap-4">
                  {selectedDiseaseConfig.fields.map(field => (
                    <div key={field} className="space-y-2">
                      <Label htmlFor={field}>{fieldLabels[field]}</Label>
                      <Input
                        id={field}
                        type="number"
                        step="0.01"
                        placeholder="Enter value"
                        value={formData[field] || ''}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    onClick={handlePredict}
                    disabled={isLoading || !selectedDisease}
                    className="w-full"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Activity className="w-4 h-4 mr-2" />
                        Predict Disease
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Prediction Results */}
        <motion.div className="space-y-6" variants={itemVariants}>
          <AnimatePresence mode="wait">
            {prediction && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Main Prediction Card */}
                <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Prediction Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center space-y-4">
                    <motion.div 
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {React.createElement(getPredictionIcon(prediction.prediction), {
                        className: `w-8 h-8 ${getPredictionColor(prediction.prediction)}`
                      })}
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{prediction.disease}</h3>
                      <Badge 
                        variant={prediction.prediction === 'Fit' ? 'default' : 'destructive'}
                        className="text-lg px-4 py-1"
                      >
                        {prediction.prediction}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-sm text-muted-foreground">Model Accuracy</p>
                      <div className="space-y-1">
                        <p className="text-2xl font-bold">{prediction.accuracy}%</p>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ delay: 0.5, duration: 1 }}
                        >
                          <Progress value={prediction.accuracy} className="h-2" />
                        </motion.div>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-sm text-muted-foreground">Confidence Level</p>
                      <div className="space-y-1">
                        <p className="text-2xl font-bold">{prediction.confidence}%</p>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ delay: 0.6, duration: 1 }}
                        >
                          <Progress value={prediction.confidence} className="h-2" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>

                  {prediction.riskFactors.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold">Key Risk Factors:</h4>
                      <div className="flex flex-wrap gap-2">
                        {prediction.riskFactors.map((factor, index) => (
                          <Badge key={index} variant="outline">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {prediction.recommendations.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold">Recommendations:</h4>
                      <ul className="space-y-1">
                        {prediction.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </CardContent>
              </Card>

              {/* Recommended Doctors */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Recommended Doctors (Odisha)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {prediction.doctors.map((doctor, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{doctor.name}</h4>
                          <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                        </div>
                        <Badge variant="outline">{doctor.specialty}</Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          {doctor.hospital}, {doctor.location}
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          {doctor.phone}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {!prediction && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center space-y-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Brain className="w-12 h-12 text-muted-foreground mx-auto" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold mb-2">Ready for Analysis</h3>
                      <p className="text-sm text-muted-foreground">
                        Select a disease type and enter your data to get started
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}