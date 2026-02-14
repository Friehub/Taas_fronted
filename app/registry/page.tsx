'use client';

import { useRecipes } from '@/lib/api';
import { StatusBadge } from '@/components/Stats';
import { Search, Filter, Database, ArrowRight } from 'lucide-react';
import { OutcomeTypeBadge } from '@/components/OutcomeDisplay';

export default function RegistryPage() {
    const { recipes, isLoading } = useRecipes();

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Recipe Registry</h1>
                    <p className="text-white/40">Browse and deploy verified truth sources.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                        <input
                            type="text"
                            placeholder="Search recipes..."
                            className="bg-[#0A0A0A] border border-white/5 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-yellow-500/50 transition-colors w-64"
                        />
                    </div>
                    <button className="p-2 bg-[#0A0A0A] border border-white/5 rounded-lg text-white/40 hover:text-white hover:border-white/20 transition-colors">
                        <Filter size={18} />
                    </button>
                    <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm rounded-lg transition-colors shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                        Create Recipe
                    </button>
                </div>
            </div>

            {/* Recipe Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {isLoading ? (
                    // Skeletons
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-64 bg-[#0A0A0A] border border-white/5 rounded-2xl animate-pulse" />
                    ))
                ) : recipes?.length ? (
                    recipes.map((recipe: any) => (
                        <div key={recipe.id} className="group flex flex-col justify-between p-6 bg-[#0A0A0A] border border-white/5 hover:border-yellow-500/20 rounded-2xl transition-all duration-300 relative overflow-hidden">
                            {/* Hover Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-[50px] transform translate-x-10 -translate-y-10 group-hover:bg-yellow-500/10 transition-colors opacity-0 group-hover:opacity-100" />

                            <div className="relative">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/40 group-hover:text-yellow-500 transition-colors">
                                        <Database size={20} />
                                    </div>
                                    <StatusBadge status={recipe.status || 'active'} />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{recipe.name}</h3>
                                <p className="text-sm text-white/40 mb-4 line-clamp-2">{recipe.description}</p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="px-2 py-1 bg-white/5 rounded text-xs text-white/60 font-medium">
                                        {recipe.category || 'General'}
                                    </span>
                                    {recipe.outcomeType && (
                                        <OutcomeTypeBadge type={recipe.outcomeType} />
                                    )}
                                </div>
                            </div>

                            <div className="relative pt-4 border-t border-white/5 flex items-center justify-between">
                                <div className="text-xs text-white/40">
                                    <span className="block mb-0.5">Frequency</span>
                                    <span className="text-white font-mono">
                                        {recipe.frequency ? `${recipe.frequency}s` : 'On-Demand'}
                                    </span>
                                </div>

                                <button className="flex items-center gap-2 text-xs font-bold text-yellow-500 hover:text-yellow-400 uppercase tracking-wide transition-colors">
                                    View Details <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full p-12 text-center border border-white/5 rounded-2xl bg-white/[0.02]">
                        <Database size={32} className="mx-auto text-white/20 mb-4" />
                        <h3 className="text-white font-bold mb-1">No Recipes Found</h3>
                        <p className="text-white/40 text-sm">Create your first recipe to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
