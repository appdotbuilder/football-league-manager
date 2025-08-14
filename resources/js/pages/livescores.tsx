import React from 'react';
import { Head, Link } from '@inertiajs/react';

interface Match {
    id: number;
    home_club: {
        name: string;
        short_name: string;
    };
    away_club: {
        name: string;
        short_name: string;
    };
    home_goals: number | null;
    away_goals: number | null;
    status: string;
    minute: number | null;
    match_date: string;
    match_type: string;
    group?: {
        name: string;
    };
    playoff_round?: string;
}

interface Props {
    liveMatches: Match[];
    todayMatches: Match[];
    [key: string]: unknown;
}

export default function Livescores({ liveMatches = [], todayMatches = [] }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };



    const getMatchLabel = (match: Match) => {
        if (match.match_type === 'playoff') {
            const round = match.playoff_round;
            return round === 'quarter' ? 'Quarter Final' : 
                   round === 'semi' ? 'Semi Final' : 
                   round === 'final' ? 'Final' : 'Playoff';
        }
        return match.group?.name || 'Group Match';
    };

    const getStatusBadge = (status: string, minute: number | null) => {
        switch (status) {
            case 'live':
                return (
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-xs px-2 py-1 rounded-full animate-pulse">
                        LIVE {minute && `${minute}'`}
                    </span>
                );
            case 'completed':
                return (
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full">
                        FT
                    </span>
                );
            case 'postponed':
                return (
                    <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs px-2 py-1 rounded-full">
                        POSTPONED
                    </span>
                );
            default:
                return (
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full">
                        {formatDate(status)}
                    </span>
                );
        }
    };

    return (
        <>
            <Head title="Live Scores - Football League" />
            
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-4">
                                <Link href={route('home')} className="flex items-center space-x-3">
                                    <div className="text-2xl">⚽</div>
                                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Football League</h1>
                                </Link>
                                <span className="text-gray-400">•</span>
                                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Live Scores</h2>
                            </div>
                            
                            <nav className="flex items-center space-x-6">
                                <Link href={route('home')} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Home</Link>
                                <Link href={route('groups')} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Groups</Link>
                                <Link href={route('playoffs')} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Playoffs</Link>
                                <Link href={route('clubs')} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Clubs</Link>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                            🔴 Live Scores
                            {liveMatches.length > 0 && (
                                <span className="ml-3 bg-red-600 text-white text-sm px-3 py-1 rounded-full animate-pulse">
                                    {liveMatches.length} LIVE
                                </span>
                            )}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Real-time scores and match updates from the football league.
                        </p>
                    </div>

                    {/* Live Matches Section */}
                    <div className="mb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="px-6 py-4 bg-red-50 dark:bg-red-900/20 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 flex items-center">
                                    🔴 Live Matches
                                    {liveMatches.length > 0 && (
                                        <span className="ml-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                                            {liveMatches.length}
                                        </span>
                                    )}
                                </h2>
                            </div>
                            <div className="p-6">
                                {liveMatches.length > 0 ? (
                                    <div className="space-y-4">
                                        {liveMatches.map((match) => (
                                            <div key={match.id} className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="text-sm font-medium text-red-700 dark:text-red-300">
                                                        {getMatchLabel(match)}
                                                    </div>
                                                    <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-sm px-3 py-1 rounded-full animate-pulse">
                                                        LIVE {match.minute && `${match.minute}'`}
                                                    </div>
                                                </div>
                                                
                                                <div className="flex justify-between items-center">
                                                    <div className="flex-1">
                                                        <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                                            {match.home_club.name}
                                                        </div>
                                                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            {match.away_club.name}
                                                        </div>
                                                    </div>
                                                    <div className="text-3xl font-bold text-center mx-8">
                                                        <div className="text-blue-600 dark:text-blue-400">{match.home_goals ?? 0}</div>
                                                        <div className="text-gray-400 text-lg">-</div>
                                                        <div className="text-blue-600 dark:text-blue-400">{match.away_goals ?? 0}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">📱</div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Live Matches</h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            There are currently no matches being played live.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Today's Matches Section */}
                    <div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="px-6 py-4 bg-blue-50 dark:bg-blue-900/20 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200">
                                    📅 Today's Matches
                                </h2>
                            </div>
                            <div className="p-6">
                                {todayMatches.length > 0 ? (
                                    <div className="space-y-4">
                                        {todayMatches.map((match) => (
                                            <div key={match.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                                        {getMatchLabel(match)}
                                                    </div>
                                                    {getStatusBadge(match.status, match.minute)}
                                                </div>
                                                
                                                <div className="flex justify-between items-center">
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="font-medium text-gray-900 dark:text-white">
                                                                {match.home_club.short_name}
                                                            </span>
                                                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                                                                {match.home_goals ?? (match.status === 'scheduled' ? '-' : '0')}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-medium text-gray-900 dark:text-white">
                                                                {match.away_club.short_name}
                                                            </span>
                                                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                                                                {match.away_goals ?? (match.status === 'scheduled' ? '-' : '0')}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    
                                                    {match.status === 'scheduled' && (
                                                        <div className="ml-4 text-sm text-gray-500 dark:text-gray-400">
                                                            {formatDate(match.match_date)}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">📅</div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Matches Today</h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            No matches are scheduled for today.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Auto Refresh Notice */}
                    <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center">
                        <p className="text-blue-700 dark:text-blue-300 text-sm">
                            📡 Live scores update automatically. Refresh the page for the latest information.
                        </p>
                    </div>
                </main>
            </div>
        </>
    );
}