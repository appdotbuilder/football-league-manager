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
    match_date: string;
}

interface PlayoffMatches {
    quarter?: Match[];
    semi?: Match[];
    final?: Match[];
}

interface Props {
    playoffMatches: PlayoffMatches;
    [key: string]: unknown;
}

export default function Playoffs({ playoffMatches = {} }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };



    const getWinner = (match: Match) => {
        if (match.status !== 'completed' || match.home_goals === null || match.away_goals === null) {
            return null;
        }

        if (match.home_goals > match.away_goals) {
            return match.home_club;
        } else if (match.away_goals > match.home_goals) {
            return match.away_club;
        }
        return null; // Draw - would need penalty shootout
    };

    const getRoundTitle = (round: string) => {
        switch (round) {
            case 'quarter': return 'Quarter Finals';
            case 'semi': return 'Semi Finals';
            case 'final': return 'Final';
            default: return round;
        }
    };

    const getRoundEmoji = (round: string) => {
        switch (round) {
            case 'quarter': return '🥊';
            case 'semi': return '⚔️';
            case 'final': return '🏆';
            default: return '⚽';
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'live':
                return (
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-xs px-2 py-1 rounded-full animate-pulse">
                        LIVE
                    </span>
                );
            case 'completed':
                return (
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full">
                        COMPLETED
                    </span>
                );
            default:
                return (
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full">
                        SCHEDULED
                    </span>
                );
        }
    };

    const hasAnyMatches = Object.keys(playoffMatches).length > 0;

    return (
        <>
            <Head title="Playoffs - Football League" />
            
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
                                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Playoffs</h2>
                            </div>
                            
                            <nav className="flex items-center space-x-6">
                                <Link href={route('home')} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Home</Link>
                                <Link href={route('groups')} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Groups</Link>
                                <Link href={route('livescores')} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Live</Link>
                                <Link href={route('clubs')} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Clubs</Link>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">⚡ Playoff Bracket</h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Knockout stage matches featuring the top 2 teams from each group.
                        </p>
                    </div>

                    {hasAnyMatches ? (
                        <div className="space-y-8">
                            {['quarter', 'semi', 'final'].map((round) => {
                                const matches = playoffMatches[round as keyof PlayoffMatches];
                                if (!matches || matches.length === 0) return null;

                                return (
                                    <div key={round} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                        <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                                            <h2 className="text-xl font-bold flex items-center">
                                                {getRoundEmoji(round)} {getRoundTitle(round)}
                                                <span className="ml-3 text-sm font-normal opacity-90">
                                                    {matches.length} {matches.length === 1 ? 'match' : 'matches'}
                                                </span>
                                            </h2>
                                        </div>
                                        
                                        <div className="p-6">
                                            <div className={`grid gap-6 ${
                                                round === 'final' ? 'grid-cols-1 max-w-2xl mx-auto' : 
                                                round === 'semi' ? 'grid-cols-1 md:grid-cols-2' : 
                                                'grid-cols-1 md:grid-cols-2 lg:grid-cols-2'
                                            }`}>
                                                {matches.map((match) => {
                                                    const winner = getWinner(match);
                                                    
                                                    return (
                                                        <div 
                                                            key={match.id} 
                                                            className={`rounded-lg border-2 p-6 ${
                                                                round === 'final' 
                                                                    ? 'border-gold-400 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20' 
                                                                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700'
                                                            }`}
                                                        >
                                                            <div className="flex justify-between items-start mb-4">
                                                                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                                                    {round === 'final' ? '🏆 Championship Final' : `${getRoundTitle(round).slice(0, -1)} ${matches.indexOf(match) + 1}`}
                                                                </div>
                                                                {getStatusBadge(match.status)}
                                                            </div>
                                                            
                                                            <div className="space-y-3">
                                                                <div className={`flex items-center justify-between p-3 rounded-lg ${
                                                                    winner && winner.short_name === match.home_club.short_name 
                                                                        ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700' 
                                                                        : 'bg-white dark:bg-gray-600'
                                                                }`}>
                                                                    <div className="flex items-center space-x-3">
                                                                        {winner && winner.short_name === match.home_club.short_name && (
                                                                            <span className="text-green-600 dark:text-green-400">🏆</span>
                                                                        )}
                                                                        <div>
                                                                            <div className="font-semibold text-gray-900 dark:text-white">
                                                                                {match.home_club.name}
                                                                            </div>
                                                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                                {match.home_club.short_name}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                                        {match.home_goals ?? (match.status === 'scheduled' ? '-' : '0')}
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="text-center text-gray-400 text-sm font-medium">
                                                                    VS
                                                                </div>
                                                                
                                                                <div className={`flex items-center justify-between p-3 rounded-lg ${
                                                                    winner && winner.short_name === match.away_club.short_name 
                                                                        ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700' 
                                                                        : 'bg-white dark:bg-gray-600'
                                                                }`}>
                                                                    <div className="flex items-center space-x-3">
                                                                        {winner && winner.short_name === match.away_club.short_name && (
                                                                            <span className="text-green-600 dark:text-green-400">🏆</span>
                                                                        )}
                                                                        <div>
                                                                            <div className="font-semibold text-gray-900 dark:text-white">
                                                                                {match.away_club.name}
                                                                            </div>
                                                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                                {match.away_club.short_name}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                                        {match.away_goals ?? (match.status === 'scheduled' ? '-' : '0')}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                                                {match.status === 'scheduled' && formatDate(match.match_date)}
                                                                {match.status === 'completed' && winner && (
                                                                    <span className="font-medium text-green-600 dark:text-green-400">
                                                                        🎉 {winner.name} advances!
                                                                    </span>
                                                                )}
                                                                {match.status === 'completed' && !winner && (
                                                                    <span className="font-medium text-blue-600 dark:text-blue-400">
                                                                        ⚽ Match ended in a draw
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
                            <div className="text-6xl mb-4">⚡</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Playoffs Not Started</h3>
                            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                                The playoff bracket will be displayed here once the group stage is completed and qualified teams are determined.
                            </p>
                            <div className="mt-6">
                                <Link 
                                    href={route('groups')}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                                >
                                    View Group Standings
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Playoff Format Info */}
                    {hasAnyMatches && (
                        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3">
                                🏆 Playoff Format
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div className="flex items-center space-x-2">
                                    <span className="text-purple-600 dark:text-purple-400">🥊</span>
                                    <span className="text-gray-700 dark:text-gray-300">Quarter Finals: 4 matches</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-purple-600 dark:text-purple-400">⚔️</span>
                                    <span className="text-gray-700 dark:text-gray-300">Semi Finals: 2 matches</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-purple-600 dark:text-purple-400">🏆</span>
                                    <span className="text-gray-700 dark:text-gray-300">Final: 1 match</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
                                All playoff matches are single elimination. The top 2 teams from each group qualify.
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}