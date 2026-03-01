/**
 * Rich Outcome Display Component
 * Renders outcomes based on their type with appropriate styling
 */

import React from 'react';
import { cn } from '@/lib/utils';

export type OutcomeType = 'BINARY' | 'SCALAR' | 'CATEGORICAL' | 'PROBABILISTIC' | 'INVALID';

export interface Outcome {
    type: OutcomeType;
    value?: number | string;
    unit?: string;
    options?: string[];
    probability?: number;
    reasoning?: string;
    confidence?: number;
    metadata?: Record<string, any>;
}

interface OutcomeDisplayProps {
    outcome: Outcome;
    showDetails?: boolean;
    className?: string;
    compact?: boolean;
}

export const OutcomeDisplay: React.FC<OutcomeDisplayProps> = ({
    outcome,
    showDetails = false,
    className = '',
    compact = false
}) => {
    if (compact) {
        return <OutcomeCompact outcome={outcome} />;
    }

    const renderOutcome = () => {
        switch (outcome.type) {
            case 'BINARY':
                return <BinaryOutcome outcome={outcome} showDetails={showDetails} />;

            case 'SCALAR':
                return <ScalarOutcome outcome={outcome} showDetails={showDetails} />;

            case 'CATEGORICAL':
                return <CategoricalOutcome outcome={outcome} showDetails={showDetails} />;

            case 'PROBABILISTIC':
                return <ProbabilisticOutcome outcome={outcome} showDetails={showDetails} />;

            case 'INVALID':
                return <InvalidOutcome outcome={outcome} showDetails={showDetails} />;

            default:
                return <div className="text-gray-500">Unknown outcome type</div>;
        }
    };

    return (
        <div className={`outcome-display ${className}`}>
            {renderOutcome()}
        </div>
    );
};

// Binary Outcome Component
const BinaryOutcome: React.FC<{ outcome: Outcome; showDetails: boolean }> = ({ outcome, showDetails }) => {
    const isYes = outcome.value === 1;

    return (
        <div className="flex items-center gap-2">
            <div className={cn(
                "px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all",
                isYes
                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                    : "bg-rose-500/10 text-rose-500 border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.2)]"
            )}>
                {isYes ? 'YES' : 'NO'}
            </div>

            {showDetails && outcome.confidence && (
                <span className="text-[10px] text-foreground/30 font-black uppercase tracking-widest">
                    {(outcome.confidence * 100).toFixed(0)}% Conf
                </span>
            )}
        </div>
    );
};

// Scalar Outcome Component
const ScalarOutcome: React.FC<{ outcome: Outcome; showDetails: boolean }> = ({ outcome, showDetails }) => {
    const value = typeof outcome.value === 'number' ? outcome.value : parseFloat(String(outcome.value));
    const formatted = value.toLocaleString('en-US', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 0
    });

    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-display font-bold text-primary tracking-tighter tabular-nums">
                    {formatted}
                </span>
                {outcome.unit && (
                    <span className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em]">
                        {outcome.unit}
                    </span>
                )}
            </div>

            {showDetails && outcome.confidence && (
                <div className="text-[10px] text-foreground/30 font-black uppercase tracking-widest">
                    Confidence: {(outcome.confidence * 100).toFixed(0)}%
                </div>
            )}
        </div>
    );
};

// Categorical Outcome Component
const CategoricalOutcome: React.FC<{ outcome: Outcome; showDetails: boolean }> = ({ outcome, showDetails }) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-xl inline-block font-black text-[10px] uppercase tracking-[0.2em] shadow-[0_0_10px_rgba(234,179,8,0.1)]">
                {outcome.value}
            </div>

            {showDetails && outcome.options && outcome.options.length > 0 && (
                <div className="space-y-2 mt-2">
                    <div className="text-[9px] font-black text-foreground/30 uppercase tracking-[0.2em]">Available options</div>
                    <div className="flex flex-wrap gap-1.5">
                        {outcome.options.map((option, idx) => (
                            <span
                                key={idx}
                                className={cn(
                                    "px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all",
                                    option === outcome.value
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                        : "bg-white/5 text-foreground/30 border border-white/5"
                                )}
                            >
                                {option}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// Probabilistic Outcome Component
const ProbabilisticOutcome: React.FC<{ outcome: Outcome; showDetails: boolean }> = ({ outcome, showDetails }) => {
    const probability = outcome.probability || 0;
    const percentage = (probability * 100).toFixed(1);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <div className="text-3xl font-display font-bold text-primary tracking-tighter tabular-nums">
                    {percentage}%
                </div>
                <div className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em]">Probability</div>
            </div>

            {/* Probability Bar */}
            <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden border border-white/5">
                <div
                    className="h-full bg-primary shadow-[0_0_10px_rgba(234,179,8,0.3)] transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {showDetails && outcome.reasoning && (
                <div className="mt-2 p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
                    <div className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-2">Sentinel Reasoning</div>
                    <div className="text-[11px] text-foreground/60 font-medium leading-relaxed">
                        {outcome.reasoning}
                    </div>
                </div>
            )}
        </div>
    );
};

// Invalid Outcome Component
const InvalidOutcome: React.FC<{ outcome: Outcome; showDetails: boolean }> = ({ outcome, showDetails }) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 px-4 py-3 bg-rose-500/10 border-l-4 border-rose-500 rounded-xl shadow-[0_0_10px_rgba(244,63,94,0.1)]">
                <span className="text-rose-500 font-black text-[10px] uppercase tracking-[0.2em]">Invalid Question</span>
            </div>

            {showDetails && outcome.reasoning && (
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="text-sm text-amber-900">
                        {outcome.reasoning}
                    </div>

                    {outcome.metadata?.correction && (
                        <div className="mt-2 pt-2 border-t border-amber-200">
                            <div className="text-xs font-semibold text-amber-800 mb-1">
                                Suggested correction:
                            </div>
                            <div className="text-sm text-amber-700">
                                {outcome.metadata.correction}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// Compact version for lists/tables
export const OutcomeCompact: React.FC<{ outcome: Outcome }> = ({ outcome }) => {
    switch (outcome.type) {
        case 'BINARY':
            return (
                <span className={cn(
                    "px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all",
                    outcome.value === 1
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_5px_rgba(16,185,129,0.2)]"
                        : "bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-[0_0_5px_rgba(244,63,94,0.2)]"
                )}>
                    {outcome.value === 1 ? 'YES' : 'NO'}
                </span>
            );

        case 'SCALAR':
            return (
                <span className="text-[11px] font-bold text-primary font-mono tabular-nums tracking-tighter">
                    {typeof outcome.value === 'number' ? outcome.value.toLocaleString() : outcome.value}
                    {outcome.unit && <span className="ml-1 opacity-40 uppercase tracking-widest text-[8px]">{outcome.unit}</span>}
                </span>
            );

        case 'CATEGORICAL':
            return (
                <span className="px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-[9px] font-black uppercase tracking-widest">
                    {outcome.value}
                </span>
            );

        case 'PROBABILISTIC':
            return (
                <span className="text-[11px] font-bold text-primary font-mono tabular-nums tracking-tighter">
                    {((outcome.probability || 0) * 100).toFixed(1)}%
                </span>
            );

        case 'INVALID':
            return (
                <span className="px-2 py-0.5 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-full text-[9px] font-black uppercase tracking-widest">
                    INVALID
                </span>
            );

        default:
            return <span className="text-gray-500 text-xs">Unknown</span>;
    }
};

// Type badge for UI
export const OutcomeTypeBadge: React.FC<{ type: OutcomeType }> = ({ type }) => {
    const colors = {
        BINARY: 'bg-gray-100 text-gray-700',
        SCALAR: 'bg-blue-100 text-blue-700',
        CATEGORICAL: 'bg-purple-100 text-purple-700',
        PROBABILISTIC: 'bg-indigo-100 text-indigo-700',
        INVALID: 'bg-amber-100 text-amber-700'
    };

    return (
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[type]}`}>
            {type}
        </span>
    );
};
