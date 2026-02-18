/**
 * Recipe Type Selector Component
 * Allows users to select outcome type when creating recipes
 */

import React, { useState } from 'react';
import { OutcomeTypeBadge } from './OutcomeDisplay';

export type OutcomeType = 'BINARY' | 'SCALAR' | 'CATEGORICAL' | 'PROBABILISTIC' | 'INVALID';

interface OutcomeTypeOption {
    type: OutcomeType;
    label: string;
    description: string;
    icon: string;
    examples: string[];
}

const outcomeTypes: OutcomeTypeOption[] = [
    {
        type: 'BINARY',
        label: 'Binary (Yes/No)',
        description: 'Simple true/false outcomes',
        icon: '',
        examples: ['Did event happen?', 'Is statement true?', 'Was goal reached?']
    },
    {
        type: 'SCALAR',
        label: 'Scalar (Number)',
        description: 'Numerical values with units',
        icon: '#',
        examples: ['BTC price in USD', 'Temperature in celsius', 'Game score']
    },
    {
        type: 'CATEGORICAL',
        label: 'Categorical (Choice)',
        description: 'One of multiple options',
        icon: '',
        examples: ['Match winner', 'Election result', 'Award category']
    },
    {
        type: 'PROBABILISTIC',
        label: 'Probabilistic (Confidence)',
        description: 'Probability with reasoning',
        icon: '%',
        examples: ['Subjective prediction', 'AI analysis', 'Forecast probability']
    },
    {
        type: 'INVALID',
        label: 'Invalid Detection',
        description: 'Detect unanswerable questions',
        icon: '!',
        examples: ['False premise checker', 'Ambiguity detector', 'Fact validator']
    }
];

interface OutcomeTypeSelectorProps {
    selected: OutcomeType;
    onChange: (type: OutcomeType) => void;
    className?: string;
}

export const OutcomeTypeSelector: React.FC<OutcomeTypeSelectorProps> = ({
    selected,
    onChange,
    className = ''
}) => {
    const [expanded, setExpanded] = useState<OutcomeType | null>(null);

    return (
        <div className={`outcome-type-selector ${className}`}>
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Outcome Type
                </label>
                <p className="text-xs text-gray-500 mb-4">
                    Choose how your recipe will return results
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {outcomeTypes.map((option) => {
                    const isSelected = selected === option.type;
                    const isExpanded = expanded === option.type;

                    return (
                        <div key={option.type} className="flex flex-col">
                            <button
                                type="button"
                                onClick={() => onChange(option.type)}
                                onMouseEnter={() => setExpanded(option.type)}
                                onMouseLeave={() => setExpanded(null)}
                                className={`
                                    p-4 rounded-xl border-2 transition-all duration-200
                                    ${isSelected
                                        ? 'border-blue-500 bg-blue-50 shadow-md'
                                        : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
                                    }
                                `}
                            >
                                <div className="flex items-start gap-3 mb-2">
                                    <div className={`
                                        text-2xl w-10 h-10 flex items-center justify-center rounded-lg
                                        ${isSelected
                                            ? 'bg-blue-100 text-blue-600'
                                            : 'bg-gray-100 text-gray-600'
                                        }
                                    `}>
                                        {option.icon}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="font-semibold text-sm text-gray-900 mb-1">
                                            {option.label}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            {option.description}
                                        </div>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                        <div className="text-xs font-medium text-gray-700 mb-1">
                                            Examples:
                                        </div>
                                        <ul className="text-xs text-gray-600 space-y-1">
                                            {option.examples.map((example, idx) => (
                                                <li key={idx} className="flex items-start gap-1">
                                                    <span className="text-blue-500 mt-0.5"></span>
                                                    <span>{example}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>

            {selected && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                        <OutcomeTypeBadge type={selected} />
                        <span className="text-sm font-semibold text-blue-900">
                            Selected
                        </span>
                    </div>
                    <div className="text-xs text-blue-800">
                        {outcomeTypes.find(t => t.type === selected)?.description}
                    </div>
                </div>
            )}
        </div>
    );
};

// Outcome type icons for visualization
export const OutcomeTypeIcon: React.FC<{ type: OutcomeType; size?: number }> = ({
    type,
    size = 16
}) => {
    const icons = {
        BINARY: '',
        SCALAR: '#',
        CATEGORICAL: '',
        PROBABILISTIC: '%',
        INVALID: '!'
    };

    const colors = {
        BINARY: 'text-gray-600',
        SCALAR: 'text-blue-600',
        CATEGORICAL: 'text-purple-600',
        PROBABILISTIC: 'text-indigo-600',
        INVALID: 'text-amber-600'
    };

    return (
        <span
            className={`inline-flex items-center justify-center ${colors[type]}`}
            style={{ fontSize: `${size}px` }}
        >
            {icons[type]}
        </span>
    );
};
