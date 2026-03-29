"use client";

import { motion } from 'framer-motion';
import { 
    ActivityLogIcon, 
    GlobeIcon, 
    LightningBoltIcon, 
    MixIcon, 
    PieChartIcon 
} from '@radix-ui/react-icons';

const CATEGORIES = [
    {
        name: "Crypto",
        icon: <LightningBoltIcon width={24} height={24} />,
        providers: ["Binance", "CoinGecko", "CryptoCompare"],
        status: "Live"
    },
    {
        name: "Sports",
        icon: <ActivityLogIcon width={24} height={24} />,
        providers: ["API-Sports", "SportDB", "The Odds API"],
        status: "Live"
    },
    {
        name: "Economics",
        icon: <PieChartIcon width={24} height={24} />,
        providers: ["World Bank", "FRED"],
        status: "Live"
    },
    {
        name: "Weather",
        icon: <GlobeIcon width={24} height={24} />,
        providers: ["OpenWeather"],
        status: "Live"
    },
    {
        name: "Forex",
        icon: <MixIcon width={24} height={24} />,
        providers: ["AlphaVantage", "ExchangeRate"],
        status: "Live"
    }
];

export function DataCategories() {
    return (
        <section className="py-32 bg-background border-y border-border">
            <div className="container mx-auto px-6">
                <div className="mb-20 text-center">
                    <h2 className="text-4xl md:text-6xl font-display font-medium text-foreground tracking-tighter mb-6">
                        Bring Your <span className="text-primary italic">Own Data.</span>
                    </h2>
                    <p className="text-xl text-foreground/40 max-w-2xl mx-auto font-light">
                        TaaS doesn't restrict what data you can fetch. The plugin network already covers major verticals, and adding yours takes 40 lines of code.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {CATEGORIES.map((cat, i) => (
                        <motion.div
                            key={cat.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 rounded-xl border border-border/50 bg-muted/5 hover:border-primary/30 transition-colors group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-primary/10 text-primary rounded-lg">
                                    {cat.icon}
                                </div>
                                <div className="text-[9px] font-black uppercase tracking-widest text-primary/60 border border-primary/20 bg-primary/5 px-2 py-1 rounded">
                                    {cat.status}
                                </div>
                            </div>
                            <h3 className="text-xl font-display font-medium text-foreground mb-4">
                                {cat.name}
                            </h3>
                            <div className="space-y-2">
                                {cat.providers.map(provider => (
                                    <div key={provider} className="text-sm text-foreground/50 flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-primary/40" />
                                        {provider}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-3 p-4 rounded-full border border-border/50 bg-muted/10">
                        <span className="w-2 h-2 rounded-full bg-[#AAFFB8] animate-pulse" />
                        <span className="text-xs uppercase tracking-widest text-foreground/60 font-black">
                            Open for Contribution: Social • Agents • News • Compute
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
