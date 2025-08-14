import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

interface LiveMatch {
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
    minute: number | null;
    status: string;
    group?: {
        name: string;
    };
}

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
    group?: {
        name: string;
    };
}

interface GroupStanding {
    group: {
        id: number;
        name: string;
    };
    standings: Array<{
        club: {
            id: number;
            name: string;
            short_name: string;
        };
        played: number;
        won: number;
        drawn: number;
        lost: number;
        goals_for: number;
        goals_against: number;
        goal_difference: number;
        points: number;
    }>;
}

interface PlayoffMatch {
    quarter?: Match[];
    semi?: Match[];
    final?: Match[];
}

interface Props {
    liveMatches: LiveMatch[];
    recentMatches: Match[];
    upcomingMatches: Match[];
    groupStandings: GroupStanding[];
    playoffMatches: PlayoffMatch;
    qualifiedClubs: Record<string, unknown[]>;
    [key: string]: unknown;
}

export default function Welcome({
    liveMatches = [],
    recentMatches = [],
    upcomingMatches = [],
    groupStandings = [],
    playoffMatches = {}
}: Props) {
    const { auth } = usePage<{ auth: { user: unknown | null } }>().props;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatScore = (homeGoals: number | null, awayGoals: number | null) => {
        if (homeGoals === null || awayGoals === null) return '-';
        return `${homeGoals} - ${awayGoals}`;
    };

    return (
        <>
            <Head title="Football League Manager">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-3">
                                <div className="text-2xl">⚽</div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Football League Manager</h1>
                            </div>
                            
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Link
                                            href={route('login')}
                                            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-medium"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="py-12 px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            ⚽ Complete Football League Management
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                            Track live scores, manage group standings, monitor playoff qualifications, and oversee club rosters all in one powerful platform.
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                <div className="text-2xl mb-2">📊</div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Live Scores</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Real-time match updates</p>
                            </div>
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                <div className="text-2xl mb-2">🏆</div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Group Standings</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Points, goals, rankings</p>
                            </div>
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                <div className="text-2xl mb-2">⚡</div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Playoffs</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Knockout stage tracking</p>
                            </div>
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                                <div className="text-2xl mb-2">🏟️</div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">Club Management</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Teams & player rosters</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Live Matches Column */}
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                <div className="px-6 py-4 bg-red-50 dark:bg-red-900/20 border-b border-gray-200 dark:border-gray-700">
                                    <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 flex items-center">
                                        🔴 Live Matches
                                        {liveMatches.length > 0 && (
                                            <span className="ml-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                                                {liveMatches.length}
                                            </span>
                                        )}
                                    </h3>
                                </div>
                                <div className="p-6">
                                    {liveMatches.length > 0 ? (
                                        <div className="space-y-4">
                                            {liveMatches.map((match) => (
                                                <div key={match.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                                            {match.group?.name || 'Playoff'} • {match.minute}'
                                                        </span>
                                                        <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-xs px-2 py-1 rounded-full animate-pulse">
                                                            LIVE
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <div className="text-sm">
                                                            <div>{match.home_club.short_name}</div>
                                                            <div>{match.away_club.short_name}</div>
                                                        </div>
                                                        <div className="text-xl font-bold text-center">
                                                            <div>{match.home_goals ?? 0}</div>
                                                            <div>{match.away_goals ?? 0}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                                            No live matches at the moment
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                <div className="px-6 py-4 bg-blue-50 dark:bg-blue-900/20 border-b border-gray-200 dark:border-gray-700">
                                    <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">📅 Upcoming Matches</h3>
                                </div>
                                <div className="p-6">
                                    {upcomingMatches.length > 0 ? (
                                        <div className="space-y-3">
                                            {upcomingMatches.slice(0, 5).map((match) => (
                                                <div key={match.id} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                                                    <div className="text-sm">
                                                        <div className="font-medium">{match.home_club.short_name} vs {match.away_club.short_name}</div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                                            {match.group?.name || 'Playoff'}
                                                        </div>
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                        {formatDate(match.match_date)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                                            No upcoming matches scheduled
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Group Standings Column */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="px-6 py-4 bg-green-50 dark:bg-green-900/20 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">🏆 Group Standings</h3>
                            </div>
                            <div className="p-6 max-h-96 overflow-y-auto">
                                {groupStandings.length > 0 ? (
                                    <div className="space-y-6">
                                        {groupStandings.map((groupData) => (
                                            <div key={groupData.group.id}>
                                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                                                    {groupData.group.name}
                                                    <span className="ml-2 text-xs text-gray-500">({groupData.standings.length} teams)</span>
                                                </h4>
                                                <div className="space-y-1">
                                                    {groupData.standings.slice(0, 4).map((team, index) => (
                                                        <div 
                                                            key={team.club.id} 
                                                            className={`flex items-center justify-between p-2 rounded-lg text-sm ${
                                                                index < 2 
                                                                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                                                                    : 'bg-gray-50 dark:bg-gray-700'
                                                            }`}
                                                        >
                                                            <div className="flex items-center space-x-2">
                                                                <span className="font-medium w-4 text-center">
                                                                    {index + 1}
                                                                </span>
                                                                {index < 2 && <span className="text-green-600 dark:text-green-400 text-xs">✓</span>}
                                                                <span className="font-medium">{team.club.short_name}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-3 text-xs">
                                                                <span className="font-bold">{team.points}pts</span>
                                                                <span className="text-gray-500">{team.played}P</span>
                                                                <span className={team.goal_difference >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                                                                    {team.goal_difference > 0 ? '+' : ''}{team.goal_difference}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                                        No group standings available
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Recent Results & Playoffs Column */}
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                <div className="px-6 py-4 bg-purple-50 dark:bg-purple-900/20 border-b border-gray-200 dark:border-gray-700">
                                    <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200">📊 Recent Results</h3>
                                </div>
                                <div className="p-6">
                                    {recentMatches.length > 0 ? (
                                        <div className="space-y-3">
                                            {recentMatches.slice(0, 6).map((match) => (
                                                <div key={match.id} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                                                    <div className="text-sm">
                                                        <div className="font-medium">
                                                            {match.home_club.short_name} {formatScore(match.home_goals, match.away_goals)} {match.away_club.short_name}
                                                        </div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                                            {match.group?.name || 'Playoff'}
                                                        </div>
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                        {formatDate(match.match_date)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                                            No recent results available
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                <div className="px-6 py-4 bg-orange-50 dark:bg-orange-900/20 border-b border-gray-200 dark:border-gray-700">
                                    <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200">⚡ Playoff Status</h3>
                                </div>
                                <div className="p-6">
                                    {Object.keys(playoffMatches).length > 0 ? (
                                        <div className="space-y-4">
                                            {Object.entries(playoffMatches).map(([round, matches]) => (
                                                <div key={round}>
                                                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 capitalize">
                                                        {round === 'quarter' ? 'Quarter Finals' : round === 'semi' ? 'Semi Finals' : 'Final'}
                                                    </h4>
                                                    {Array.isArray(matches) && matches.map((match: Match) => (
                                                        <div key={match.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-2">
                                                            <div className="flex justify-between items-center">
                                                                <div className="text-sm">
                                                                    <span className="font-medium">
                                                                        {match.home_club.short_name} vs {match.away_club.short_name}
                                                                    </span>
                                                                </div>
                                                                <div className="text-sm">
                                                                    {match.status === 'completed' ? (
                                                                        <span className="font-bold">
                                                                            {formatScore(match.home_goals, match.away_goals)}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-gray-500 dark:text-gray-400">
                                                                            {formatDate(match.match_date)}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                                            Playoffs not started yet
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-12 text-center">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                            <h3 className="text-2xl font-bold mb-4">Ready to Manage Your League? ⚽</h3>
                            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                                Join thousands of league administrators who trust our platform for comprehensive football management.
                                Get started today and experience the future of sports administration.
                            </p>
                            {!auth.user && (
                                <div className="flex justify-center space-x-4">
                                    <Link
                                        href={route('register')}
                                        className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                                    >
                                        Start Free Trial
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-sm">
                            Built with ❤️ by{" "}
                            <a 
                                href="https://app.build" 
                                target="_blank" 
                                className="font-medium text-blue-400 hover:text-blue-300"
                            >
                                app.build
                            </a>
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}