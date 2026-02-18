'use client';

import { useRecipes } from '@/lib/api';
import { StatCard, StatusBadge } from '../../components/shared/StatCard';
import { Database, Shield, Server, Activity as ActivityIcon, Search, Filter, MoreHorizontal, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { OutcomeTypeBadge } from '@/components/OutcomeDisplay';

export default function RegistryPage() {
    const { recipes, isLoading } = useRecipes();

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Recipe Registry</h1>
                    <p className="text-muted-foreground">Browse and deploy verified truth sources.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40" size={16} />
                        <input
                            type="text"
                            placeholder="Search recipes..."
                            className="bg-muted border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors w-64"
                        />
                    </div>
                    <button className="p-2 bg-muted border border-border rounded-lg text-muted-foreground/60 hover:text-foreground hover:border-border transition-colors">
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
                        <div key={i} className="h-64 bg-card border border-border rounded-2xl animate-pulse" />
                    ))
                ) : recipes?.length ? (
                    recipes.map((recipe: any) => (
                        <div key={recipe.id} className="group flex flex-col justify-between p-6 bg-card border border-border hover:border-primary/20 rounded-2xl transition-all duration-300 relative overflow-hidden">
                            {/* Hover Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[50px] transform translate-x-10 -translate-y-10 group-hover:bg-primary/10 transition-colors opacity-0 group-hover:opacity-100" />

                            <div className="relative">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center text-muted-foreground/60 group-hover:text-primary transition-colors">
                                        <Database size={20} />
                                    </div>
                                    <StatusBadge status={recipe.status || 'active'} />
                                </div>

                                <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">{recipe.name}</h3>
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{recipe.description}</p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground/80 font-medium">
                                        {recipe.category || 'General'}
                                    </span>
                                    {recipe.outcomeType && (
                                        <OutcomeTypeBadge type={recipe.outcomeType} />
                                    )}
                                </div>
                            </div>

                            <div className="relative pt-4 border-t border-border flex items-center justify-between">
                                <div className="text-xs text-muted-foreground">
                                    <span className="block mb-0.5">Frequency</span>
                                    <span className="text-foreground font-mono">
                                        {recipe.frequency ? `${recipe.frequency}s` : 'On-Demand'}
                                    </span>
                                </div>

                                <button className="flex items-center gap-2 text-xs font-bold text-primary hover:text-primary/80 uppercase tracking-wide transition-colors">
                                    View Details <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full p-12 text-center border border-border rounded-2xl bg-muted/50">
                        <Database size={32} className="mx-auto text-muted-foreground/20 mb-4" />
                        <h3 className="text-foreground font-bold mb-1">No Recipes Found</h3>
                        <p className="text-muted-foreground text-sm">Create your first recipe to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
