import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMockDataStore from '../../../store/mockDataStore.js';
import useAuthStore from '../../../store/authStore.js';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import Select from '../../../common/ui/Select.jsx';
import Input from '../../../common/ui/Input.jsx';
import { Wrench, Sparkles, Cpu, ShieldAlert, CheckCircle } from 'lucide-react';
import api from '../../../services/axios.js';

export const RaiseMaintenancePage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { assets, addMaintenance } = useMockDataStore();

  const userId = user?.id || '';

  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // AI Diagnostics State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // Filter equipment belonging to user
  const myAssets = assets.filter(a => a.allocations?.some(al => al.userId === userId));
  const dropdownAssets = myAssets.length > 0 ? myAssets : assets;

  const handleAiDiagnostics = async () => {
    if (!description) {
      setError('Please write a brief issue description before running AI diagnostics.');
      return;
    }
    setError('');
    setIsAnalyzing(true);
    setAiResult(null);
    try {
      const res = await api.post('/maintenance/diagnose', { description });
      if (res.success) {
        setAiResult(res.data);
      } else {
        setError('Diagnostics engine returned an invalid response structure.');
      }
    } catch (err) {
      setError('Failed to reach AI Diagnostics service.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const applyRecommendations = () => {
    if (!aiResult) return;
    setPriority(aiResult.priority);
    setEstimatedCost(aiResult.estimatedCost);
    setSuccessMsg('AI predictions applied to fields!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!selectedAssetId || !description) {
      setError('Please select an asset and describe the issue.');
      return;
    }

    addMaintenance({
      assetId: selectedAssetId,
      userId: userId,
      description: description,
      cost: Number(estimatedCost),
      priority: priority,
      status: 'PENDING'
    });

    navigate('/maintenance');
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <PageTitle title="Raise Maintenance Request" subtitle="Report issues, damage, or request routine diagnostic servicing on hardware." />

      <div style={{ display: 'grid', gridTemplateColumns: aiResult || isAnalyzing ? '1.2fr 1fr' : '1fr', gap: '24px', transition: 'all 0.3s ease' }}>
        {/* Main Request Form */}
        <div className="liora-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--spacing-md)' }}>
            <Wrench size={20} style={{ color: 'var(--moss)' }} />
            <h3 style={{ fontSize: '1.25rem' }}>Repair Request Form</h3>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ color: 'var(--danger)', background: 'var(--danger-light)', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>
                {error}
              </div>
            )}
            {successMsg && (
              <div style={{ color: 'var(--success)', background: 'var(--success-light)', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>
                {successMsg}
              </div>
            )}

            <Select
              label="Select Equipment"
              options={[
                { label: 'Choose asset...', value: '' },
                ...dropdownAssets.map(a => ({ label: `${a.name} (${a.code || a.assetTag})`, value: a.id }))
              ]}
              value={selectedAssetId}
              onChange={(e) => setSelectedAssetId(e.target.value)}
              required
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <label className="eyebrow">Issue Details & Symptoms</label>
              <textarea
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-input)',
                  border: '1px solid var(--sage-light)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  outline: 'none',
                  minHeight: '120px'
                }}
                placeholder="Describe the issue. (e.g., Screen is flickering, laptop is overheating under stress...)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={handleAiDiagnostics}
                  disabled={isAnalyzing}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
                >
                  <Sparkles size={14} style={{ color: 'var(--gold)' }} />
                  {isAnalyzing ? 'Analyzing with AI...' : 'Run AI Diagnostics'}
                </Button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <Select
                label="Priority Level"
                options={[
                  { label: 'Low', value: 'LOW' },
                  { label: 'Medium', value: 'MEDIUM' },
                  { label: 'High', value: 'HIGH' },
                  { label: 'Critical', value: 'CRITICAL' }
                ]}
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              />
              <Input
                label="Estimated Repair Cost ($)"
                type="number"
                value={estimatedCost}
                onChange={(e) => setEstimatedCost(Number(e.target.value))}
              />
            </div>

            <div className="flex gap-sm" style={{ marginTop: 'var(--spacing-lg)' }}>
              <Button type="submit" variant="primary" style={{ flex: 1 }}>Submit Repair Request</Button>
              <Button type="button" variant="secondary" onClick={() => navigate('/maintenance')}>Cancel</Button>
            </div>
          </form>
        </div>

        {/* AI Assistant Output Column */}
        {(aiResult || isAnalyzing) && (
          <div className="liora-card" style={{ 
            background: 'linear-gradient(135deg, rgba(230, 245, 230, 0.7) 0%, rgba(240, 250, 240, 0.4) 100%)',
            borderColor: 'rgba(74, 117, 89, 0.3)',
            animation: 'fadeIn 0.4s ease-out'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Cpu size={20} style={{ color: 'var(--moss)' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>AI Diagnostics Report</h3>
            </div>

            {isAnalyzing ? (
              <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--charcoal-light)' }}>
                <div className="spinner" style={{ marginBottom: '12px' }}></div>
                <p>Analyzing symptoms & predicting repair profiles...</p>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <span className="eyebrow" style={{ display: 'block' }}>Failure Category</span>
                    <span style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--moss)' }}>{aiResult.failureCategory}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="eyebrow" style={{ display: 'block' }}>Suggested Cost</span>
                    <span style={{ fontSize: '1rem', fontWeight: '600' }}>${aiResult.estimatedCost}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', background: 'white', borderRadius: 'var(--radius-sm)', marginBottom: '16px', borderLeft: '4px solid var(--gold)' }}>
                  <ShieldAlert size={18} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  <div style={{ fontSize: '0.85rem' }}>
                    <strong>Recommended Priority:</strong> {aiResult.priority}
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <span className="eyebrow" style={{ display: 'block', marginBottom: '6px' }}>Recommended Resolution</span>
                  <p style={{ fontSize: '0.9rem', color: 'var(--charcoal)', lineHeight: '1.4' }}>{aiResult.recommendedAction}</p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <span className="eyebrow" style={{ display: 'block', marginBottom: '6px' }}>Technician Diagnostic Steps</span>
                  <ul style={{ paddingLeft: '16px', fontSize: '0.85rem', color: 'var(--charcoal-light)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {aiResult.diagnosticSteps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                </div>

                <Button 
                  type="button" 
                  variant="primary" 
                  onClick={applyRecommendations}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <CheckCircle size={16} /> Apply AI Predictions
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RaiseMaintenancePage;
