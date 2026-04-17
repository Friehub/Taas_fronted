"use client";

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardState {
    operator: {
        health: number;
        uptime: string;
        rewards: string;
        successRate: number;
        attestations: number[];
    };
    network: {
        activeNodes: number;
        uptime: number;
        requestsProcessed: string;
        tvl: string;
        proofs: any[];
    };
    loading: boolean;
}

const initialState: DashboardState = {
    operator: {
        health: 99.8,
        uptime: "742h",
        rewards: "12.4k",
        successRate: 100,
        attestations: [12, 14, 18, 22, 19, 25, 30, 28, 35, 42, 38, 45, 50, 48, 55, 62, 58, 65, 70, 68],
    },
    network: {
        activeNodes: 2482,
        uptime: 99.99,
        requestsProcessed: "14.2M",
        tvl: "$842.1M",
        proofs: [],
    },
    loading: false,
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        updateOperatorStatus: (state, action: PayloadAction<Partial<DashboardState['operator']>>) => {
            state.operator = { ...state.operator, ...action.payload };
        },
        updateNetworkStatus: (state, action: PayloadAction<Partial<DashboardState['network']>>) => {
            state.network = { ...state.network, ...action.payload };
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { updateOperatorStatus, updateNetworkStatus, setLoading } = dashboardSlice.actions;
export default dashboardSlice.reducer;
