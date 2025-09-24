import React, { useState, useCallback } from 'react';
import { 
  BookOpen, 
  Trophy, 
  Target, 
  Settings, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Lightbulb,
  TestTube,
  BarChart3,
  Shield,
  Eye,
  AlertTriangle
} from 'lucide-react';

type TestMaterial = {
  id: string;
  name: string;
  type: 'solid' | 'liquid';
  isConductor: boolean;
  description: string;
  icon: string;
};

type TestResult = {
  materialId: string;
  bulbLit: boolean;
  result: 'İletken' | 'Yalıtkan';
  notes?: string;
};

type Phase = 'theory' | 'materials' | 'safety' | 'variables' | 'setup' | 'hypothesis' | 'experiment' | 'observation' | 'analysis' | 'errors' | 'evaluation';

const testMaterials: TestMaterial[] = [
  {
    id: 'aluminum_foil',
    name: 'Alüminyum Folyo',
    type: 'solid',
    isConductor: true,
    description: 'Metal folyo - elektriği iletir',
    icon: '🥡'
  },
  {
    id: 'fabric',
    name: 'Kumaş Parçası',
    type: 'solid',
    isConductor: false,
    description: 'Tekstil malzemesi - elektriği iletmez',
    icon: '🧵'
  },
  {
    id: 'silver_wire',
    name: 'Gümüş Tel',
    type: 'solid',
    isConductor: true,
    description: 'Gümüş metal tel - mükemmel iletken',
    icon: '🔗'
  },
  {
    id: 'copper_wire',
    name: 'Bakır Tel',
    type: 'solid',
    isConductor: true,
    description: 'Bakır metal tel - çok iyi iletken',
    icon: '🔗'
  },
  {
    id: 'plastic',
    name: 'Plastik Parçası',
    type: 'solid',
    isConductor: false,
    description: 'Plastik malzeme - elektriği iletmez',
    icon: '🧱'
  },
  {
    id: 'coin',
    name: 'Madeni Para',
    type: 'solid',
    isConductor: true,
    description: 'Metal para - elektriği iletir',
    icon: '🪙'
  },
  {
    id: 'salt_water',
    name: 'Tuzlu Su',
    type: 'liquid',
    isConductor: true,
    description: 'İyon içeren çözelti - elektriği iletir',
    icon: '🧂'
  },
  {
    id: 'sugar_water',
    name: 'Şekerli Su',
    type: 'liquid',
    isConductor: false,
    description: 'İyon içermeyen çözelti - elektriği iletmez',
    icon: '🍯'
  }
];

function App() {
  const [currentPhase, setCurrentPhase] = useState<Phase>('theory');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isTesting, setIsTesting] = useState(false);
  const [bulbLit, setBulbLit] = useState(false);
  const [circuitConnected, setCircuitConnected] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [hypothesis, setHypothesis] = useState<'conductors' | 'insulators' | 'mixed' | null>(null);

  const phases: { id: Phase; title: string; icon: React.ReactNode }[] = [
    { id: 'theory', title: 'Öğrenim Çıktısı ve Amaç', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'materials', title: 'Malzemeler', icon: <Settings className="w-5 h-5" /> },
    { id: 'safety', title: 'Güvenlik', icon: <Shield className="w-5 h-5" /> },
    { id: 'variables', title: 'Değişkenler', icon: <Target className="w-5 h-5" /> },
    { id: 'setup', title: 'Deney Düzeneği', icon: <Settings className="w-5 h-5" /> },
    { id: 'hypothesis', title: 'Hipotez', icon: <Lightbulb className="w-5 h-5" /> },
    { id: 'experiment', title: 'Deney', icon: <TestTube className="w-5 h-5" /> },
    { id: 'observation', title: 'Gözlem', icon: <Eye className="w-5 h-5" /> },
    { id: 'analysis', title: 'Analiz', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'errors', title: 'Hata Kaynakları', icon: <AlertTriangle className="w-5 h-5" /> },
    { id: 'evaluation', title: 'Değerlendirme', icon: <CheckCircle className="w-5 h-5" /> }
  ];

  const nextPhase = useCallback(() => {
    const currentIndex = phases.findIndex(p => p.id === currentPhase);
    if (currentIndex < phases.length - 1) {
      setCurrentPhase(phases[currentIndex + 1].id);
    }
  }, [currentPhase, phases]);

  const prevPhase = useCallback(() => {
    const currentIndex = phases.findIndex(p => p.id === currentPhase);
    if (currentIndex > 0) {
      setCurrentPhase(phases[currentIndex - 1].id);
    }
  }, [currentPhase, phases]);

  const startTest = useCallback((materialId: string) => {
    const material = testMaterials.find(m => m.id === materialId);
    if (!material) return;

    setSelectedMaterial(materialId);
    setIsTesting(true);
    setCircuitConnected(true);
    
    // Simulate testing delay
    setTimeout(() => {
      const result: TestResult = {
        materialId,
        bulbLit: material.isConductor && switchOn,
        result: material.isConductor ? 'İletken' : 'Yalıtkan',
        notes: material.isConductor ? 'Lamba yandı' : 'Lamba yanmadı'
      };
      
      setTestResults(prev => [...prev.filter(r => r.materialId !== materialId), result]);
      setBulbLit(material.isConductor && switchOn);
      setIsTesting(false);
    }, 2000);
  }, [switchOn]);

  const resetTest = useCallback(() => {
    setTestResults([]);
    setBulbLit(false);
    setCircuitConnected(false);
    setIsTesting(false);
    setSwitchOn(false);
    setSelectedMaterial(null);
  }, []);

  const TheoryPhase = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          Öğrenim Çıktısı ve Amaç
        </h2>
        
        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Öğrenim Çıktısı
          </h3>
          <p className="text-gray-700 mb-4">
            Basit bir elektrik devresi kullanarak farklı maddelerin iletken mi yoksa yalıtkan mı olduğunu deneyle gözlemler ve sınıflandırır.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-blue-200 mt-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Amaç
          </h3>
          <p className="text-gray-700">
            Alüminyum folyo, kumaş, gümüş tel, bakır tel, plastik, madeni para, tuzlu su ve şekerli suyun iletkenlik durumlarını test etmek.
          </p>
        </div>
      </div>
    </div>
  );

  const MaterialsPhase = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border">
        <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
          <Settings className="w-6 h-6" />
          Malzemeler
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">Devre Elemanları</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• 1,5 V pil + pil yatağı</li>
              <li>• Küçük ampul (veya LED + direnç)</li>
              <li>• 3 adet krokodil kablo</li>
              <li>• Anahtar (yoksa kablo tak–çıkar yapılır)</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">Test Edilecek Maddeler</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Alüminyum folyo</li>
              <li>• Kumaş parçası</li>
              <li>• Gümüş tel</li>
              <li>• Bakır tel</li>
              <li>• Plastik parçası</li>
              <li>• Madeni para</li>
              <li>• Tuzlu su</li>
              <li>• Şekerli su</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const SafetyPhase = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border">
        <h2 className="text-2xl font-bold text-red-800 mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6" />
          Güvenlik, Düzen ve Etik
        </h2>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-red-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-800 mb-2">Güvenlik Kuralları</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Pil uçlarını kısa devre yapmayın</li>
                  <li>• Sıvı çözeltileri kullanırken kabloları ıslatmayın</li>
                  <li>• Suya batırırken sadece uç kısımları temas ettirin</li>
                  <li>• Deney bitince pilleri ayırın</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const VariablesPhase = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border">
        <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
          <Target className="w-6 h-6" />
          Değişkenler
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-800 mb-2">Bağımsız Değişken</h3>
            <p className="text-sm text-gray-700">Madde türü</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-800 mb-2">Bağımlı Değişken</h3>
            <p className="text-sm text-gray-700">Lambanın yanma durumu</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-800 mb-2">Kontrol Değişkenleri</h3>
            <p className="text-sm text-gray-700">Pil türü, lamba türü, kablo sayısı, süre</p>
          </div>
        </div>
      </div>
    </div>
  );

  const SetupPhase = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border">
        <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
          <Settings className="w-6 h-6" />
          Deney Düzeneği
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">Devre Elemanları</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• 1,5 V pil + pil yatağı</li>
              <li>• Küçük ampul (veya LED + direnç)</li>
              <li>• 3 adet krokodil kablo</li>
              <li>• Anahtar (yoksa kablo tak–çıkar yapılır)</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">Test Edilecek Maddeler</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Alüminyum folyo</li>
              <li>• Kumaş parçası</li>
              <li>• Gümüş tel</li>
              <li>• Bakır tel</li>
              <li>• Plastik parçası</li>
              <li>• Madeni para</li>
              <li>• Tuzlu su</li>
              <li>• Şekerli su</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 bg-white p-4 rounded-lg border border-green-200">
          <h3 className="font-semibold text-green-800 mb-3">Hazırlık Adımları</h3>
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="bg-green-200 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">1</span>
              <span>Pil + lamba + kablo ile devreyi kurup çalıştığını doğrulayın</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-green-200 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">2</span>
              <span>İki uç arasına test edilecek maddeyi koyarak devreyi tamamlayın</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );

  const HypothesisPhase = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border">
        <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6" />
          Hipotez Oluşturma
        </h2>
        <p className="text-gray-700 mb-4">
          Deneye başlamadan önce, farklı maddelerin elektrik iletkenliği hakkında ne düşünüyorsunuz?
        </p>

        <div className="space-y-3">
          {[
            {key:'conductors',label:'Metaller elektriği iletir, diğerleri iletmez'},
            {key:'insulators',label:'Hiçbir madde elektriği iletmez'},
            {key:'mixed',label:'Bazı metaller iletir, bazıları iletmez'}
          ].map(opt => (
            <label key={opt.key} className={`block border rounded-lg px-4 py-3 cursor-pointer ${
              hypothesis === opt.key ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white'
            }`}>
              <input
                type="radio"
                name="hypothesis"
                className="mr-2"
                checked={hypothesis === opt.key}
                onChange={() => setHypothesis(opt.key as any)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const CircuitVisualization = () => {
    const material = selectedMaterial ? testMaterials.find(m => m.id === selectedMaterial) : null;
    const isConnected = circuitConnected && selectedMaterial;
    const bulbOn = bulbLit && isConnected && switchOn;

    return (
      <div className="bg-gray-100 p-6 rounded-lg border-2 border-gray-300">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Elektrik Devresi</h3>
        
        {/* Circuit Diagram */}
        <div className="relative bg-white p-8 rounded-lg border border-gray-200 mb-4">
          <svg viewBox="0 0 400 200" className="w-full h-48">
            {/* Battery */}
            <rect x="20" y="80" width="30" height="40" fill="#374151" stroke="#4B5563" strokeWidth="2" rx="4"/>
            <rect x="25" y="85" width="8" height="15" fill="#EF4444" rx="1"/>
            <rect x="35" y="85" width="8" height="15" fill="#D1D5DB" rx="1"/>
            <text x="35" y="140" textAnchor="middle" className="text-xs fill-gray-600">1.5V Pil</text>
            
            {/* Wire 1 */}
            <line x1="50" y1="100" x2="120" y2="100" stroke={isConnected ? "#10B981" : "#9CA3AF"} strokeWidth="3"/>
            
            {/* Test Material */}
            <rect x="120" y="80" width="60" height="40" 
                  fill={material ? (material.isConductor ? "#DCFCE7" : "#FEE2E2") : "#F3F4F6"}
                  stroke={material ? (material.isConductor ? "#10B981" : "#EF4444") : "#9CA3AF"} 
                  strokeWidth="2" rx="4"/>
            <text x="150" y="105" textAnchor="middle" className="text-lg">
              {material?.icon || '❓'}
            </text>
            <text x="150" y="140" textAnchor="middle" className="text-xs fill-gray-600">
              {material?.name || 'Test Maddesi'}
            </text>
            
            {/* Wire 2 */}
            <line x1="180" y1="100" x2="250" y2="100" stroke={isConnected ? "#10B981" : "#9CA3AF"} strokeWidth="3"/>
            
            {/* Bulb */}
            <circle cx="250" cy="100" r="15" 
                    fill={bulbOn ? "#FEF3C7" : "#F3F4F6"}
                    stroke={bulbOn ? "#F59E0B" : "#9CA3AF"} 
                    strokeWidth="2"/>
            <text x="250" y="130" textAnchor="middle" className="text-xs fill-gray-600">Ampul</text>
            
            {/* Wire 3 */}
            <line x1="265" y1="100" x2="320" y2="100" stroke={isConnected ? "#10B981" : "#9CA3AF"} strokeWidth="3"/>
            
            {/* Switch */}
            <rect x="320" y="90" width="20" height="20" 
                  fill={switchOn ? "#DCFCE7" : "#F3F4F6"}
                  stroke={switchOn ? "#10B981" : "#9CA3AF"} 
                  strokeWidth="2" rx="2"/>
            <circle cx={switchOn ? "335" : "325"} cy="100" r="3" 
                    fill={switchOn ? "#10B981" : "#9CA3AF"}/>
            <text x="330" y="130" textAnchor="middle" className="text-xs fill-gray-600">Anahtar</text>
            
            {/* Return wire */}
            <line x1="340" y1="100" x2="380" y2="100" stroke={isConnected ? "#10B981" : "#9CA3AF"} strokeWidth="3"/>
            <line x1="380" y1="100" x2="380" y2="120" stroke={isConnected ? "#10B981" : "#9CA3AF"} strokeWidth="3"/>
            <line x1="380" y1="120" x2="20" y2="120" stroke={isConnected ? "#10B981" : "#9CA3AF"} strokeWidth="3"/>
            <line x1="20" y1="120" x2="20" y2="100" stroke={isConnected ? "#10B981" : "#9CA3AF"} strokeWidth="3"/>
          </svg>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setSwitchOn(!switchOn)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              switchOn 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            Anahtar {switchOn ? 'Açık' : 'Kapalı'}
          </button>
        </div>

        {/* Status */}
        <div className="text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
            bulbOn ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
          }`}>
            <Lightbulb className="w-4 h-4" />
            <span className="text-sm font-medium">
              {bulbOn ? 'Lamba Yanıyor' : 'Lamba Yanmıyor'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const ExperimentPhase = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border">
        <h2 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
          <TestTube className="w-6 h-6" />
          Deney - Test Maddeleri
        </h2>
        
        <div className="mb-6">
          <CircuitVisualization />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {testMaterials.map((material) => {
            const result = testResults.find(r => r.materialId === material.id);
            const isTested = !!result;
            const isCurrent = selectedMaterial === material.id;
            
            return (
              <div
                key={material.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  isCurrent ? 'border-blue-500 bg-blue-50' :
                  isTested ? (result.bulbLit ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') :
                  'border-gray-300 bg-white hover:border-gray-400'
                }`}
                onClick={() => !isTesting && startTest(material.id)}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{material.icon}</div>
                  <h3 className="font-semibold text-sm mb-1">{material.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">{material.description}</p>
                  
                  {isTested && (
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                      result.bulbLit ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {result.bulbLit ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {result.result}
                    </div>
                  )}
                  
                  {isTesting && isCurrent && (
                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      Test Ediliyor...
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={resetTest}
            className="btn-secondary flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Sıfırla
          </button>
        </div>
      </div>
    </div>
  );

  const EvaluationPhase = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
          <CheckCircle className="w-6 h-6" />
          Değerlendirme
        </h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Kayıt Tablosu</h3>
          
          <div className="bg-white rounded-lg border border-blue-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">No</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">Madde</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">Gözlem (Lamba)</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">Sonuç</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">Not</th>
              </tr>
            </thead>
            <tbody>
              {testMaterials.map((material, index) => {
                const result = testResults.find(r => r.materialId === material.id);
                return (
                  <tr key={material.id} className="border-t border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 flex items-center gap-2">
                      <span>{material.icon}</span>
                      {material.name}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {result ? (
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                          result.bulbLit ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {result.bulbLit ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {result.bulbLit ? 'Yanıyor' : 'Yanmıyor'}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {result ? (
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                          result.result === 'İletken' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {result.result === 'İletken' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {result.result}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {result?.notes || '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Temel Kavramlar</h3>
          <div className="bg-white p-4 rounded-lg border border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-green-800 mb-2">İletken Maddeler</h4>
                <p className="text-sm text-gray-700">Elektriği ileten maddeler. Metaller ve tuzlu su gibi iyon içeren çözeltiler iletkendir.</p>
              </div>
              <div>
                <h4 className="font-semibold text-red-800 mb-2">Yalıtkan Maddeler</h4>
                <p className="text-sm text-gray-700">Elektriği iletmeyen maddeler. Plastik, kumaş ve şekerli su gibi maddeler yalıtkandır.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ObservationPhase = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
          <Eye className="w-6 h-6" />
          Gözlem Kayıtları
        </h2>
        
        <div className="bg-white rounded-lg border border-blue-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">No</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">Madde</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">Gözlem (Lamba)</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">Sonuç</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-blue-800">Not</th>
              </tr>
            </thead>
            <tbody>
              {testMaterials.map((material, index) => {
                const result = testResults.find(r => r.materialId === material.id);
                return (
                  <tr key={material.id} className="border-t border-gray-200">
                    <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 flex items-center gap-2">
                      <span>{material.icon}</span>
                      {material.name}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {result ? (
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                          result.bulbLit ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {result.bulbLit ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {result.bulbLit ? 'Yanıyor' : 'Yanmıyor'}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {result ? (
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                          result.result === 'İletken' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {result.result === 'İletken' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {result.result}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {result?.notes || '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const ErrorsPhase = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border">
        <h2 className="text-2xl font-bold text-orange-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6" />
          Hata Kaynakları ve İyileştirme
        </h2>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-orange-800 mb-3">Olası Hata Kaynakları</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">•</span>
                <span>Sıvılarda kablonun iyi temas etmemesi</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">•</span>
                <span>Madeni paranın yüzeyinde kir/oksit bulunması</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">•</span>
                <span>Pillerin zayıf olması</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 mt-1">•</span>
                <span>Kabloların gevşek bağlanması</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-orange-800 mb-3">İyileştirme Önerileri</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Kabloları sıkıca bağlayın</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Yeni piller kullanın</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Madeni parayı temizleyin</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Sıvılarda kablo uçlarını iyi temas ettirin</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const AnalysisPhase = () => {
    const conductors = testResults.filter(r => r.result === 'İletken');
    const insulators = testResults.filter(r => r.result === 'Yalıtkan');
    
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border">
          <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            Veri Analizi
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                İletkenler ({conductors.length})
              </h3>
              <ul className="space-y-1 text-sm text-gray-700">
                {conductors.map(result => {
                  const material = testMaterials.find(m => m.id === result.materialId);
                  return (
                    <li key={result.materialId} className="flex items-center gap-2">
                      <span>{material?.icon}</span>
                      <span>{material?.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Yalıtkanlar ({insulators.length})
              </h3>
              <ul className="space-y-1 text-sm text-gray-700">
                {insulators.map(result => {
                  const material = testMaterials.find(m => m.id === result.materialId);
                  return (
                    <li key={result.materialId} className="flex items-center gap-2">
                      <span>{material?.icon}</span>
                      <span>{material?.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          
          <div className="mt-6 bg-white p-4 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-800 mb-2">Sonuç</h3>
            <p className="text-sm text-gray-700">
              Bu sonuç, elektrik akımının metalleri ve iyon içeren çözeltileri ilettiğini; 
              iyon içermeyen maddelerden geçmediğini göstermektedir.
            </p>
          </div>
          
          {hypothesis && (
            <div className={`mt-6 p-4 rounded-lg ${
              hypothesis === 'conductors' ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'
            }`}>
              <h3 className={`font-semibold ${
                hypothesis === 'conductors' ? 'text-green-800' : 'text-red-800'
              } mb-2 flex items-center gap-2`}>
                {hypothesis === 'conductors' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                Hipotez Kontrolü
              </h3>
              <p className={`${
                hypothesis === 'conductors' ? 'text-green-700' : 'text-red-700'
              }`}>
                {hypothesis === 'conductors'
                  ? 'Tebrikler! Hipoteziniz doğru. Metaller elektriği iletir, diğerleri iletmez.'
                  : 'Hipoteziniz yanlış. Metaller elektriği iletir, diğerleri iletmez.'}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };


  const renderCurrentPhase = () => {
    switch (currentPhase) {
      case 'theory': return <TheoryPhase />;
      case 'materials': return <MaterialsPhase />;
      case 'safety': return <SafetyPhase />;
      case 'variables': return <VariablesPhase />;
      case 'setup': return <SetupPhase />;
      case 'hypothesis': return <HypothesisPhase />;
      case 'experiment': return <ExperimentPhase />;
      case 'observation': return <ObservationPhase />;
      case 'analysis': return <AnalysisPhase />;
      case 'errors': return <ErrorsPhase />;
      case 'evaluation': return <EvaluationPhase />;
      default: return <TheoryPhase />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            6. Sınıf - Elektrik İletkenliği Deneyi
          </h1>
          <p className="text-lg text-gray-600">
            Maddelerin Elektriği İletme Durumlarına Göre Sınıflandırılması
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">İlerleme</span>
            <span className="text-sm font-medium text-gray-700">
              {phases.findIndex(p => p.id === currentPhase) + 1} / {phases.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((phases.findIndex(p => p.id === currentPhase) + 1) / phases.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Phase Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {phases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setCurrentPhase(phase.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  currentPhase === phase.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {phase.icon}
                {phase.title}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {renderCurrentPhase()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 max-w-6xl mx-auto">
          <button
            onClick={prevPhase}
            disabled={phases.findIndex(p => p.id === currentPhase) === 0}
            className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Önceki
          </button>
          
          <div className="text-center">
            <span className="text-sm text-gray-600">
              {phases.find(p => p.id === currentPhase)?.title}
            </span>
          </div>
          
          <button
            onClick={nextPhase}
            disabled={phases.findIndex(p => p.id === currentPhase) === phases.length - 1}
            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sonraki →
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
