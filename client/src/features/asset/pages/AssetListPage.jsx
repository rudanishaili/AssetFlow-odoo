import React, { useState } from 'react';
import PageTitle from '../../../common/layout/PageTitle';
import DataTable from '../../../common/tables/DataTable';
import TableActions from '../../../common/tables/TableActions';
import Button from '../../../common/ui/Button';
import Badge from '../../../common/ui/Badge';
import Modal from '../../../common/ui/Modal';
import FormInput from '../../../common/forms/FormInput';
import FormSelect from '../../../common/forms/FormSelect';

export default function AssetListPage() {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [assets, setAssets] = useState([
    { id: '1', name: 'MacBook Pro 16"', serial: 'SN-987234', category: 'Hardware', status: 'Available' },
    { id: '2', name: 'Dell UltraSharp 27"', serial: 'SN-443811', category: 'Hardware', status: 'Allocated' },
    { id: '3', name: 'Slack Pro Enterprise License', serial: 'LIC-7729', category: 'Software', status: 'Available' },
    { id: '4', name: 'Lenovo ThinkPad T14', serial: 'SN-552199', category: 'Hardware', status: 'Maintenance' },
  ]);

  const [newAsset, setNewAsset] = useState({ name: '', serial: '', category: 'Hardware', status: 'Available' });

  const headers = ['Name', 'Serial Number', 'Category', 'Status', 'Actions'];

  const filteredAssets = assets.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) || 
    a.serial.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddAsset = () => {
    if (!newAsset.name || !newAsset.serial) return;
    setAssets([...assets, { ...newAsset, id: String(assets.length + 1) }]);
    setNewAsset({ name: '', serial: '', category: 'Hardware', status: 'Available' });
    setIsOpen(false);
  };

  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'available': return 'success';
      case 'allocated': return 'info';
      case 'maintenance': return 'warning';
      default: return 'neutral';
    }
  };

  return (
    <div>
      <PageTitle 
        title="Assets Registry" 
        subtitle="Manage hardware, software licenses, and physical infrastructure assets."
        action={<Button variant="primary" onClick={() => setIsOpen(true)}>Add Asset</Button>}
      />

      <TableActions 
        searchValue={search} 
        onSearchChange={setSearch} 
        searchPlaceholder="Search assets by name or serial..."
      />

      <DataTable
        headers={headers}
        data={filteredAssets}
        emptyTitle="No assets registered"
        emptyDescription="Get started by clicking Add Asset to register your hardware or licenses."
        renderRow={(asset) => (
          <>
            <td style={{ padding: '16px 24px', fontWeight: 500 }}>{asset.name}</td>
            <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{asset.serial}</td>
            <td style={{ padding: '16px 24px' }}>{asset.category}</td>
            <td style={{ padding: '16px 24px' }}>
              <Badge variant={getStatusVariant(asset.status)}>{asset.status}</Badge>
            </td>
            <td style={{ padding: '16px 24px' }}>
              <Button variant="outline" size="sm">Details</Button>
            </td>
          </>
        )}
      />

      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title="Register New Asset"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddAsset}>Register</Button>
          </>
        }
      >
        <FormInput 
          label="Asset Name" 
          placeholder="e.g. Dell Latitude 7420"
          value={newAsset.name}
          onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
        />
        <FormInput 
          label="Serial Number" 
          placeholder="e.g. SN-883921"
          value={newAsset.serial}
          onChange={(e) => setNewAsset({ ...newAsset, serial: e.target.value })}
        />
        <FormSelect
          label="Category"
          placeholder="Select category"
          options={[
            { value: 'Hardware', label: 'Hardware' },
            { value: 'Software', label: 'Software' },
            { value: 'License', label: 'License' },
          ]}
          value={newAsset.category}
          onChange={(e) => setNewAsset({ ...newAsset, category: e.target.value })}
        />
      </Modal>
    </div>
  );
}
