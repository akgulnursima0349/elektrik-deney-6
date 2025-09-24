import React, { useState, useEffect, useCallback } from 'react';
import { 
  BookOpen, 
  Trophy, 
  Target, 
  Shield, 
  Settings, 
  Play, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Lightbulb,
  Battery,
  Zap,
  TestTube,
  FileText,
  BarChart3,
  AlertTriangle,
  CheckSquare,
  Square
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

type Phase = 'theory' | 'materials' | 'safety' | 'variables' | 'preparation' | 'procedure' | 'testing' | 'results' | 'analysis' | 'conclusion';

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
  const [currentTestIndex, setCurrentTestIndex] = useState(0);
  const [isTesting, setIsTesting] = useState(false);
  const [bulbLit, setBulbLit] = useState(false);
  const [circuitConnected, setCircuitConnected] = useState(false);

  const phases: { id: Phase; title: string; icon: React.ReactNode }[] = [
    { id: 'theory', title: 'Kazanım ve Amaç', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'materials', title: 'Malzemeler', icon: <Settings className="w-5 h-5" /> },
    { id: 'safety', title: 'Güvenlik', icon: <Shield className="w-5 h-5" /> },
    { id: 'variables', title: 'Değişkenler', icon: <Target className="w-5 h-5" /> },
    { id: 'preparation', title: 'Hazırlık', icon: <Settings className="w-5 h-5" /> },
    { id: 'procedure', title: 'Prosedür', icon: <Play className="w-5 h-5" /> },
    { id: 'testing', title: 'Deney', icon: <TestTube className="w-5 h-5" /> },
    { id: 'results', title: 'Sonuçlar', icon: <FileText className="w-5 h-5" /> },
    { id: 'analysis', title: 'Analiz', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'conclusion', title: 'Sonuç', icon: <CheckCircle className="w-5 h-5" /> }
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

    setIsTesting(true);
    setCircuitConnected(true);
    
    // Simulate testing delay
    setTimeout(() => {
      const result: TestResult = {
        materialId,
        bulbLit: material.isConductor,
        result: material.isConductor ? 'İletken' : 'Yalıtkan',
        notes: material.isConductor ? 'Lamba yandı' : 'Lamba yanmadı'
      };
      
      setTestResults(prev => [...prev.filter(r => r.materialId !== materialId), result]);
      setBulbLit(material.isConductor);
      setIsTesting(false);
    }, 2000);
  }, []);

  const resetTest = useCallback(() => {
    setTestResults([]);
    setCurrentTestIndex(0);
    setBulbLit(false);
    setCircuitConnected(false);
    setIsTesting(false);
  }, []);

  const TheoryPhase = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6" />
          Kazanım ve Amaç
        </h2>
        
        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Öğrenme Çıktısı
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

  const PreparationPhase = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border">
        <h2 className="text-2xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
          <Settings className="w-6 h-6" />
          Hazırlık
        </h2>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-yellow-800 mb-3">Hazırlık Adımları</h3>
            <ol className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="bg-yellow-200 text-yellow-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">1</span>
                <span>Pil + lamba + kablo ile devreyi kurup çalıştığını doğrulayın</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-yellow-200 text-yellow-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">2</span>
                <span>İki uç arasına test edilecek maddeyi koyarak devreyi tamamlayın</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );

  const ProcedurePhase = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border">
        <h2 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center gap-2">
          <Play className="w-6 h-6" />
          Prosedür
        </h2>
        
        <div className="bg-white p-4 rounded-lg border border-indigo-200">
          <h3 className="font-semibold text-indigo-800 mb-3">Deney Adımları</h3>
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="bg-indigo-200 text-indigo-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">1</span>
              <span>Alüminyum folyoyu uçlara bağlayın, lambayı gözlemleyin</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-indigo-200 text-indigo-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">2</span>
              <span>Aynı işlemi sırasıyla kumaş, gümüş tel, bakır tel, plastik, madeni para, tuzlu su, şekerli su için uygulayın</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-indigo-200 text-indigo-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold">3</span>
              <span>Her gözlemi tabloya kaydedin</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );

  const CircuitVisualization = ({ materialId }: { materialId?: string }) => {
    const material = materialId ? testMaterials.find(m => m.id === materialId) : null;
    const isConnected = circuitConnected && materialId;
    const bulbOn = bulbLit && isConnected;

    return (
      <div className="bg-gray-100 p-6 rounded-lg border-2 border-gray-300">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Elektrik Devresi</h3>
        
        <div className="flex items-center justify-center space-x-8">
          {/* Battery */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-8 bg-gray-800 rounded border-2 border-gray-600 flex items-center justify-center">
              <div className="w-2 h-4 bg-red-500 rounded-sm"></div>
              <div className="w-2 h-4 bg-gray-300 rounded-sm ml-1"></div>
            </div>
            <span className="text-xs text-gray-600 mt-1">1.5V Pil</span>
          </div>

          {/* Wire 1 */}
          <div className={`w-16 h-1 ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}></div>

          {/* Test Material */}
          <div className="flex flex-col items-center">
            <div className={`w-16 h-12 border-2 rounded-lg flex items-center justify-center ${
              material ? (material.isConductor ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : 'border-gray-400 bg-gray-50'
            }`}>
              <span className="text-2xl">{material?.icon || '❓'}</span>
            </div>
            <span className="text-xs text-gray-600 mt-1 text-center max-w-16">
              {material?.name || 'Test Maddesi'}
            </span>
          </div>

          {/* Wire 2 */}
          <div className={`w-16 h-1 ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}></div>

          {/* Bulb */}
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
              bulbOn ? 'border-yellow-400 bg-yellow-100' : 'border-gray-400 bg-gray-100'
            }`}>
              <Lightbulb className={`w-5 h-5 ${bulbOn ? 'text-yellow-500' : 'text-gray-400'}`} />
            </div>
            <span className="text-xs text-gray-600 mt-1">Ampul</span>
          </div>

          {/* Wire 3 */}
          <div className={`w-16 h-1 ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}></div>

          {/* Switch */}
          <div className="flex flex-col items-center">
            <div className={`w-6 h-6 border-2 rounded flex items-center justify-center ${
              isConnected ? 'border-green-500 bg-green-100' : 'border-gray-400 bg-gray-100'
            }`}>
              <div className={`w-3 h-3 rounded-sm ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            </div>
            <span className="text-xs text-gray-600 mt-1">Anahtar</span>
          </div>
        </div>

        <div className="mt-4 text-center">
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

  const TestingPhase = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border">
        <h2 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
          <TestTube className="w-6 h-6" />
          Deney - Test Maddeleri
        </h2>
        
        <div className="mb-6">
          <CircuitVisualization materialId={testResults[currentTestIndex]?.materialId} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {testMaterials.map((material) => {
            const result = testResults.find(r => r.materialId === material.id);
            const isTested = !!result;
            const isCurrent = currentTestIndex < testMaterials.length && testMaterials[currentTestIndex].id === material.id;
            
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

  const ResultsPhase = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border">
        <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
          <FileText className="w-6 h-6" />
          Kayıt Tablosu
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
        </div>
      </div>
    );
  };

  const ConclusionPhase = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border">
        <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
          <CheckCircle className="w-6 h-6" />
          Sonuç
        </h2>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-3">Deney Sonucu</h3>
            <p className="text-gray-700 mb-4">
              Metaller ve tuzlu su gibi iyon içeren çözeltiler elektriği iletirken; 
              kumaş, plastik ve şekerli su elektriği iletmemiştir. 
              Böylece maddeler elektriği iletme durumlarına göre iletkenler ve 
              yalıtkanlar olarak sınıflandırılmıştır.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-3">Hata Kaynakları ve İyileştirme</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Sıvılarda kablonun iyi temas etmemesi</li>
              <li>• Madeni paranın yüzeyinde kir/oksit bulunması</li>
              <li>• Pillerin zayıf olması</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentPhase = () => {
    switch (currentPhase) {
      case 'theory': return <TheoryPhase />;
      case 'materials': return <MaterialsPhase />;
      case 'safety': return <SafetyPhase />;
      case 'variables': return <VariablesPhase />;
      case 'preparation': return <PreparationPhase />;
      case 'procedure': return <ProcedurePhase />;
      case 'testing': return <TestingPhase />;
      case 'results': return <ResultsPhase />;
      case 'analysis': return <AnalysisPhase />;
      case 'conclusion': return <ConclusionPhase />;
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
