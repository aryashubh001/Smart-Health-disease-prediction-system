import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar, 
  User, 
  Activity, 
  Camera,
  Share2,
  Trash2,
  Plus,
  Filter,
  Search
} from 'lucide-react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface MedicalReport {
  id: string;
  type: 'disease-prediction' | 'skin-analysis';
  title: string;
  date: string;
  status: 'completed' | 'pending' | 'reviewed';
  result: string;
  accuracy?: number;
  confidence?: number;
  severity?: 'Mild' | 'Moderate' | 'Severe';
  summary: string;
  recommendations: string[];
}

export function Reports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for demonstration
  const mockReports: MedicalReport[] = [
    {
      id: '1',
      type: 'disease-prediction',
      title: 'Heart Disease Risk Assessment',
      date: '2024-01-15',
      status: 'completed',
      result: 'Low Risk',
      accuracy: 94,
      summary: 'Based on the provided medical parameters, your heart disease risk is currently low.',
      recommendations: [
        'Maintain regular exercise routine',
        'Continue healthy diet',
        'Monitor blood pressure regularly',
        'Schedule annual checkups'
      ]
    },
    {
      id: '2',
      type: 'skin-analysis',
      title: 'Skin Condition Analysis - Facial Area',
      date: '2024-01-12',
      status: 'completed',
      result: 'Mild Acne',
      confidence: 88,
      severity: 'Mild',
      summary: 'Mild acne condition detected with good treatment prognosis.',
      recommendations: [
        'Use gentle, non-comedogenic products',
        'Maintain consistent skincare routine',
        'Avoid touching affected areas',
        'Consider salicylic acid treatments'
      ]
    },
    {
      id: '3',
      type: 'disease-prediction',
      title: 'Diabetes Risk Evaluation',
      date: '2024-01-10',
      status: 'reviewed',
      result: 'Moderate Risk',
      accuracy: 91,
      summary: 'Moderate diabetes risk identified. Lifestyle modifications recommended.',
      recommendations: [
        'Implement regular exercise program',
        'Adopt low-glycemic diet',
        'Monitor blood glucose levels',
        'Consult with endocrinologist'
      ]
    },
    {
      id: '4',
      type: 'skin-analysis',
      title: 'Mole Assessment - Back Area',
      date: '2024-01-08',
      status: 'completed',
      result: 'Benign Nevus',
      confidence: 92,
      severity: 'Mild',
      summary: 'Benign nevus identified. No immediate concerns, but monitor for changes.',
      recommendations: [
        'Self-examine monthly for changes',
        'Use sun protection',
        'Schedule annual dermatology checkup',
        'Document any size or color changes'
      ]
    },
    {
      id: '5',
      type: 'disease-prediction',
      title: 'Kidney Function Assessment',
      date: '2024-01-05',
      status: 'pending',
      result: 'Pending Analysis',
      summary: 'Analysis in progress. Results will be available soon.',
      recommendations: []
    }
  ];

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.result.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || report.type === filterType;
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'disease-prediction' ? Activity : Camera;
  };

  const getResultColor = (result: string, type: string) => {
    if (type === 'disease-prediction') {
      if (result.includes('Low') || result.includes('Fit')) return 'text-green-600';
      if (result.includes('Moderate') || result.includes('Risk')) return 'text-yellow-600';
      if (result.includes('High') || result.includes('Severe')) return 'text-red-600';
    } else {
      if (result.includes('Benign') || result.includes('Mild')) return 'text-green-600';
      if (result.includes('Moderate')) return 'text-yellow-600';
      if (result.includes('Severe') || result.includes('Malignant')) return 'text-red-600';
    }
    return 'text-muted-foreground';
  };

  const generatePDFReport = (report: MedicalReport) => {
    // Mock PDF generation
    console.log('Generating PDF for report:', report.id);
    // In a real app, this would generate and download a PDF
  };

  const shareReport = (report: MedicalReport) => {
    // Mock sharing functionality
    console.log('Sharing report:', report.id);
    // In a real app, this would open sharing options
  };

  const deleteReport = (reportId: string) => {
    console.log('Deleting report:', reportId);
    // In a real app, this would delete the report
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
        <h1 className="text-3xl font-bold mb-2">Medical Reports</h1>
        <p className="text-muted-foreground">
          View, manage, and download your AI-generated medical reports
        </p>
      </motion.div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Search & Filter Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="disease-prediction">Disease Prediction</SelectItem>
                <SelectItem value="skin-analysis">Skin Analysis</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="space-y-6">
        {filteredReports.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center space-y-4">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="font-semibold mb-2">No Reports Found</h3>
                  <p className="text-sm text-muted-foreground">
                    {searchTerm || filterType !== 'all' || filterStatus !== 'all' 
                      ? 'Try adjusting your search or filters'
                      : 'Start by creating your first health assessment'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
          >
            {filteredReports.map((report, index) => (
              <motion.div
                key={report.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      {React.createElement(getTypeIcon(report.type), {
                        className: 'w-5 h-5 text-primary'
                      })}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(report.date).toLocaleDateString()}
                        </div>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </Badge>
                        <Badge variant="outline">
                          {report.type === 'disease-prediction' ? 'Disease Prediction' : 'Skin Analysis'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => generatePDFReport(report)}>
                      <Download className="w-4 h-4 mr-1" />
                      PDF
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => shareReport(report)}>
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => deleteReport(report.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Result</p>
                    <p className={`font-semibold ${getResultColor(report.result, report.type)}`}>
                      {report.result}
                    </p>
                  </div>
                  
                  {report.accuracy && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Model Accuracy</p>
                      <p className="font-semibold">{report.accuracy}%</p>
                    </div>
                  )}
                  
                  {report.confidence && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Confidence</p>
                      <p className="font-semibold">{report.confidence}%</p>
                    </div>
                  )}
                  
                  {report.severity && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Severity</p>
                      <Badge className={getStatusColor(report.severity.toLowerCase())}>
                        {report.severity}
                      </Badge>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">Summary</h4>
                    <p className="text-sm text-muted-foreground">{report.summary}</p>
                  </div>
                  
                  {report.recommendations.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Key Recommendations</h4>
                      <ul className="space-y-1">
                        {report.recommendations.slice(0, 3).map((rec, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                            {rec}
                          </li>
                        ))}
                        {report.recommendations.length > 3 && (
                          <li className="text-sm text-primary">
                            +{report.recommendations.length - 3} more recommendations
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Summary Statistics */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Report Statistics</CardTitle>
          <CardDescription>Overview of your health assessments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">{mockReports.length}</div>
              <div className="text-sm text-muted-foreground">Total Reports</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-green-600">
                {mockReports.filter(r => r.status === 'completed').length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-blue-600">
                {mockReports.filter(r => r.type === 'disease-prediction').length}
              </div>
              <div className="text-sm text-muted-foreground">Disease Predictions</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-purple-600">
                {mockReports.filter(r => r.type === 'skin-analysis').length}
              </div>
              <div className="text-sm text-muted-foreground">Skin Analyses</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert className="mt-8">
        <FileText className="h-4 w-4" />
        <AlertDescription>
          <strong>Privacy Notice:</strong> All reports are stored securely and are only accessible by you. 
          You can download, share, or delete your reports at any time.
        </AlertDescription>
      </Alert>
    </div>
  );
}