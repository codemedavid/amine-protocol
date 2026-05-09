import { useState, useEffect } from 'react';
import { Shield, Award, CheckCircle, X, ExternalLink, Download, Sparkles, ArrowLeft, Copy, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useCOAPageSetting } from '@/hooks/useCOAPageSetting';

interface COAReport {
  id: string;
  product_name: string;
  batch: string;
  test_date: string;
  purity_percentage: number;
  quantity: string;
  task_number: string;
  verification_key: string;
  image_url: string;
  featured: boolean;
  laboratory: string;
}

export default function COA() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [coaReports, setCOAReports] = useState<COAReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { coaPageEnabled, loading: settingLoading } = useCOAPageSetting();

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  useEffect(() => {
    fetchCOAReports();
  }, []);

  const fetchCOAReports = async () => {
    try {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('coa_reports')
        .select('*')
        .order('test_date', { ascending: false });

      if (error) throw error;
      setCOAReports(data || []);
    } catch (error) {
      console.error('Error fetching COA reports:', error);
    } finally {
      setLoading(false);
    }
  };

  if (settingLoading || loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!coaPageEnabled) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-8">
          <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-primary mb-2">Lab Reports Unavailable</h1>
          <p className="text-muted-foreground mb-6">The COA page is currently disabled.</p>
          <a href="/" className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-light transition-colors">
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-accent-light to-accent py-8 md:py-14">
        <div className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40" />

        <a
          href="/"
          className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm border border-gray-200 text-primary hover:text-secondary transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </a>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full shadow-sm mb-4 border border-gray-200">
            <Shield className="w-4 h-4 text-secondary" />
            <span className="text-xs font-bold text-secondary">Lab Verified</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-3">
            Lab Reports
            <Sparkles className="inline-block w-6 h-6 md:w-8 md:h-8 text-yellow-400 ml-2 mb-1 animate-pulse" />
          </h1>

          <p className="text-muted-foreground mb-6 text-sm md:text-base">
            Tested by <strong className="text-primary">Janoshik + Chromate</strong>
          </p>

          <div className="flex flex-wrap justify-center gap-3 text-xs md:text-sm">
            {[
              { icon: CheckCircle, label: '99%+ Purity', color: 'text-emerald-500' },
              { icon: Award, label: 'Certified', color: 'text-secondary' },
              { icon: Shield, label: 'Verified', color: 'text-primary' },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-gray-200">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className="font-medium text-primary">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {coaReports.length === 0 ? (
            <div className="col-span-2 text-center py-20">
              <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">No lab reports available yet.</p>
            </div>
          ) : (
            coaReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden border border-gray-200 hover:border-secondary/40 hover:-translate-y-1"
              >
                <div
                  className="relative cursor-pointer group"
                  onClick={() => setSelectedImage(report.image_url)}
                >
                  <img
                    src={report.image_url}
                    alt={`${report.product_name} Certificate of Analysis`}
                    className="w-full h-48 sm:h-56 md:h-64 lg:h-80 object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f5f5f5" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23999" font-size="18" font-family="Arial"%3ECOA Image Coming Soon%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-card">
                      <p className="text-sm font-bold text-primary flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        View full report
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4 gap-2">
                    <h3 className="text-base md:text-lg font-bold text-primary">{report.product_name}</h3>
                    {report.featured && (
                      <span className="bg-accent-light text-secondary px-2.5 py-1 rounded-full text-xs font-bold border border-accent whitespace-nowrap">
                        ✓ VERIFIED
                      </span>
                    )}
                  </div>

                  <div className="space-y-2.5 mb-5">
                    {[
                      { label: 'Purity', value: `${report.purity_percentage}%`, valueClass: 'text-emerald-600 font-bold' },
                      { label: 'Quantity', value: report.quantity, valueClass: 'text-secondary font-bold' },
                      {
                        label: 'Test Date',
                        value: new Date(report.test_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase(),
                        valueClass: 'text-primary',
                      },
                    ].map(({ label, value, valueClass }) => (
                      <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-muted-foreground font-medium">{label}:</span>
                        <span className={`text-sm ${valueClass}`}>{value}</span>
                      </div>
                    ))}

                    {[
                      { label: 'Task', value: `#${report.task_number}`, copyKey: `${report.id}-task`, copyValue: report.task_number },
                      { label: 'Unique Key', value: report.verification_key, copyKey: `${report.id}-key`, copyValue: report.verification_key },
                    ].map(({ label, value, copyKey, copyValue }) => (
                      <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-muted-foreground font-medium">{label}:</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-primary font-mono">{value}</span>
                          <button
                            onClick={() => handleCopy(copyValue, copyKey)}
                            className="p-1 hover:bg-accent-light rounded-full transition-colors"
                          >
                            {copiedId === copyKey ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    {(() => {
                      const isJanoshik = !report.laboratory || report.laboratory.toLowerCase().includes('janoshik');
                      const verificationUrl = isJanoshik
                        ? `https://www.janoshik.com/verify/?key=${report.verification_key}`
                        : 'https://chromate.org';
                      return (
                        <a
                          href={verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 shadow-sm"
                        >
                          <Shield className="w-4 h-4" />
                          {isJanoshik ? 'Verify on Janoshik' : 'Verify on Chromate'}
                        </a>
                      );
                    })()}

                    <button
                      onClick={() => setSelectedImage(report.image_url)}
                      className="w-full flex items-center justify-center gap-2 bg-accent-light text-primary border border-accent hover:border-secondary/40 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300"
                    >
                      <Download className="w-4 h-4" />
                      View Full Report
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Info Card */}
        <div className="mt-10 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-accent-light to-accent rounded-2xl p-6 md:p-8 border border-accent">
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary mb-2">Independent Laboratory Verification</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  We partner with top-tier third-party laboratories like <strong className="text-primary">Janoshik Analytical</strong> and{' '}
                  <strong className="text-primary">Chromate</strong> to ensure the highest quality standards. Each batch is rigorously tested
                  for purity and concentration using HPLC and Mass Spectrometry.
                </p>
                <div className="flex gap-4">
                  <a href="https://www.janoshik.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-primary font-medium transition-colors">
                    Janoshik <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a href="https://chromate.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-primary font-medium transition-colors">
                    Chromate <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-5xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedImage}
              alt="Certificate of Analysis"
              className="w-full h-auto rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
