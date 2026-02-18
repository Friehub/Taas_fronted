/**
 * Rich Outcome Display Component
 * Renders outcomes based on their type with appropriate styling
 */

import React from 'react';

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
            <div className={`
                px-4 py-2 rounded-lg font-semibold text-sm
                ${isYes ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
            `}>
                {isYes ? 'YES' : 'NO'}
            </div>

            {showDetails && outcome.confidence && (
                <span className="text-sm text-gray-600">
                    ({(outcome.confidence * 100).toFixed(0)}% confident)
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
                <span className="text-2xl font-bold text-blue-600">
                    {formatted}
                </span>
                {outcome.unit && (
                    <span className="text-lg text-gray-600">
                        {outcome.unit}
                    </span>
                )}
            </div>

            {showDetails && outcome.confidence && (
                <div className="text-sm text-gray-500">
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
            <div className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg inline-block font-semibold">
                {outcome.value}
            </div>

            {showDetails && outcome.options && outcome.options.length > 0 && (
                <div className="text-sm text-gray-600">
                    <div className="font-medium mb-1">Available options:</div>
                    <div className="flex flex-wrap gap-1">
                        {outcome.options.map((option, idx) => (
                            <span
                                key={idx}
                                className={`
                                    px-2 py-1 rounded text-xs
                                    ${option === outcome.value
                                        ? 'bg-purple-200 text-purple-900 font-semibold'
                                        : 'bg-gray-100 text-gray-600'
                                    }
                                `}
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
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-indigo-600">
                    {percentage}%
                </div>
                <div className="text-sm text-gray-600">probability</div>
            </div>

            {/* Probability Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {showDetails && outcome.reasoning && (
                <div className="mt-2 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                    <div className="text-xs font-semibold text-indigo-900 mb-1">Reasoning:</div>
                    <div className="text-sm text-indigo-800">
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
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 border-l-4 border-amber-500 rounded">
                <span className="text-amber-800 font-semibold">INVALID QUESTION</span>
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
                <span className={`
                    px-2 py-1 rounded text-xs font-semibold
                    ${outcome.value === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                `}>
                    {outcome.value === 1 ? 'YES' : 'NO'}
                </span>
            );

        case 'SCALAR':
            return (
                <span className="text-sm font-medium text-blue-700">
                    {typeof outcome.value === 'number' ? outcome.value.toLocaleString() : outcome.value}
                    {outcome.unit && ` ${outcome.unit}`}
                </span>
            );

        case 'CATEGORICAL':
            return (
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-semibold">
                    {outcome.value}
                </span>
            );

        case 'PROBABILISTIC':
            return (
                <span className="text-sm font-semibold text-indigo-600">
                    {((outcome.probability || 0) * 100).toFixed(1)}%
                </span>
            );

        case 'INVALID':
            return (
                <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs font-semibold">
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
