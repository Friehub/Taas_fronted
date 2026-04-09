import React, { useState, useEffect, useMemo } from 'react';
import { Shield, ExternalLink, Search, Filter, ArrowUpRight } from 'lucide-react';
import { ethers } from 'ethers';

interface Operator {
  address: string;
  status: 'Active' | 'Inactive' | 'Pending';
  stake: string;
  hardware: string;
  joined: string;
}

// Institutional ABIs
const SERVICE_MANAGER_ABI = [
  "event OperatorAVSRegistrationStatusUpdated(address indexed operator, uint8 status)",
  "function getOperatorStatus(address operator) external view returns (bool)"
];

export const ValidatorRegistry: React.FC = () => {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState(true);
  const siteName = import.meta.env.VITE_SITE_NAME || "Validator Registry";

  useEffect(() => {
    const fetchValidators = async () => {
      try {
        const provider = new ethers.JsonRpcProvider(import.meta.env.VITE_RPC_URL);
        const serviceManager = new ethers.Contract(
          import.meta.env.VITE_SERVICE_MANAGER_PROXY,
          SERVICE_MANAGER_ABI,
          provider
        );

        // Institutional Discovery: For now, we manually track the initial operator
        // In Phase 21, this will be an automated event scraper
        const mainOperator = "0xc1b5Dd31524aBF5d890C369509095A5bEF5d34fb";
        const isActive = await serviceManager.getOperatorStatus(mainOperator);

        setOperators([
          { 
            address: mainOperator, 
            status: isActive ? 'Active' : 'Inactive', 
            stake: '1,250.00 TAAS', 
            hardware: 'SGX', 
            joined: 'Registered' 
          }
        ]);
      } catch (error) {
        console.error("Institutional Data Failure:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchValidators();
  }, []);

  // Discipline: Memoize filtered set to ensure smooth render lifecycle
  const filteredOperators = useMemo(() => operators, [operators]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">{siteName}</h1>
          <p className="mt-1 text-muted-foreground text-sm">Monitor all institutional nodes currently opted into the TaaS AVS.</p>
        </div>
        
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Filter by address..." 
              className="h-10 border border-border bg-white dark:bg-zinc-950 px-9 text-sm outline-none focus:border-mint transition-colors w-64"
            />
          </div>
          <button className="flex items-center space-x-2 border border-border bg-white dark:bg-zinc-950 px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
            <Filter size={16} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          { label: 'Total Validators', value: '42' },
          { label: 'Network Stake', value: '1.2M TAAS' },
          { label: 'Verifiable Hardware', value: '89%' }
        ].map((stat) => (
          <div key={stat.label} className="border border-border bg-white dark:bg-zinc-950 p-6">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-display tracking-tight">{stat.value}</span>
              <ArrowUpRight className="text-mint h-4 w-4" />
            </div>
          </div>
        ))}
      </div>

      <div className="border border-border bg-white dark:bg-zinc-950 overflow-hidden">
        <table className="w-full text-left bg-white dark:bg-zinc-950">
          <thead className="border-b border-border bg-muted/50 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-6 py-4">Node Address</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Hardware</th>
              <th className="px-6 py-4">Total Stake</th>
              <th className="px-6 py-4">Registration</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground animate-pulse">
                  Synchronizing with Sepolia...
                </td>
              </tr>
            ) : filteredOperators.map((op) => (
              <tr key={op.address} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-xs">{op.address}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      op.status === 'Active' ? 'bg-mint' : 'bg-red-500'
                    )} />
                    <span className="font-medium">{op.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-3 w-3 text-mint" />
                    <span className="text-xs font-semibold">{op.hardware}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono">{op.stake}</td>
                <td className="px-6 py-4 text-muted-foreground">{op.joined}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-mint hover:underline inline-flex items-center space-x-1">
                    <span>Explorer</span>
                    <ExternalLink size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
