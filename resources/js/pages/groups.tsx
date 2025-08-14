import React from 'react';
import { Head, Link } from '@inertiajs/react';

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
    qualified: Array<{
        club: {
            id: number;
            name: string;
            short_name: string;
        };
        points: number;
        goal_difference: number;
    }>;
}

interface Props {
    groupStandings: GroupStanding[];
    [key: string]: unknown;
}

export default function Groups({ groupStandings = [] }: Props) {
    return (
        <>
            <Head title="Group Standings - Football League" />
            
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
                                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Group Standings</h2>
                            </div>
                            
                            <nav className="flex items-center space-x-6">
                                <Link href={route('home')} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Home</Link>
                                <Link href={route('livescores')} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Live</Link>
                                <Link href={route('playoffs')} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Playoffs</Link>
                                <Link href={route('clubs')} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Clubs</Link>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">🏆 Group Standings</h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Current standings for all groups in the league. Top 2 teams from each group qualify for the playoffs.
                        </p>
                    </div>

                    {groupStandings.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {groupStandings.map((groupData) => (
                                <div key={groupData.group.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                                    <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                        <h2 className="text-xl font-bold flex items-center justify-between">
                                            {groupData.group.name}
                                            <span className="text-sm font-normal opacity-90">
                                                {groupData.qualified.length} qualified
                                            </span>
                                        </h2>
                                    </div>
                                    
                                    <div className="p-6">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm">
                                                <thead>
                                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                                        <th className="text-left py-2 font-semibold text-gray-900 dark:text-white">Pos</th>
                                                        <th className="text-left py-2 font-semibold text-gray-900 dark:text-white">Team</th>
                                                        <th className="text-center py-2 font-semibold text-gray-900 dark:text-white">P</th>
                                                        <th className="text-center py-2 font-semibold text-gray-900 dark:text-white">W</th>
                                                        <th className="text-center py-2 font-semibold text-gray-900 dark:text-white">D</th>
                                                        <th className="text-center py-2 font-semibold text-gray-900 dark:text-white">L</th>
                                                        <th className="text-center py-2 font-semibold text-gray-900 dark:text-white">GF</th>
                                                        <th className="text-center py-2 font-semibold text-gray-900 dark:text-white">GA</th>
                                                        <th className="text-center py-2 font-semibold text-gray-900 dark:text-white">GD</th>
                                                        <th className="text-center py-2 font-semibold text-gray-900 dark:text-white">Pts</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {groupData.standings.map((team, index) => (
                                                        <tr 
                                                            key={team.club.id} 
                                                            className={`border-b border-gray-100 dark:border-gray-700 ${
                                                                index < 2 
                                                                    ? 'bg-green-50 dark:bg-green-900/20' 
                                                                    : ''
                                                            }`}
                                                        >
                                                            <td className="py-3">
                                                                <div className="flex items-center space-x-2">
                                                                    <span className="font-medium">{index + 1}</span>
                                                                    {index < 2 && (
                                                                        <span className="text-green-600 dark:text-green-400 text-xs" title="Qualified for playoffs">
                                                                            ✓
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="py-3">
                                                                <Link 
                                                                    href={route('clubs.show', team.club.id)}
                                                                    className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                                                                >
                                                                    {team.club.name}
                                                                </Link>
                                                            </td>
                                                            <td className="text-center py-3">{team.played}</td>
                                                            <td className="text-center py-3">{team.won}</td>
                                                            <td className="text-center py-3">{team.drawn}</td>
                                                            <td className="text-center py-3">{team.lost}</td>
                                                            <td className="text-center py-3">{team.goals_for}</td>
                                                            <td className="text-center py-3">{team.goals_against}</td>
                                                            <td className={`text-center py-3 font-medium ${
                                                                team.goal_difference > 0 
                                                                    ? 'text-green-600 dark:text-green-400' 
                                                                    : team.goal_difference < 0 
                                                                        ? 'text-red-600 dark:text-red-400' 
                                                                        : ''
                                                            }`}>
                                                                {team.goal_difference > 0 ? '+' : ''}{team.goal_difference}
                                                            </td>
                                                            <td className="text-center py-3 font-bold text-blue-600 dark:text-blue-400">
                                                                {team.points}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                        {groupData.qualified.length > 0 && (
                                            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                                <h4 className="text-sm font-semibold text-green-800 dark:text-green-200 mb-2">
                                                    ✅ Qualified for Playoffs
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {groupData.qualified.map((qualified) => (
                                                        <span 
                                                            key={qualified.club.id}
                                                            className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 rounded-full text-sm font-medium"
                                                        >
                                                            {qualified.club.short_name}
                                                            <span className="ml-1 text-xs opacity-75">
                                                                ({qualified.points} pts)
                                                            </span>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
                            <div className="text-6xl mb-4">🏆</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Groups Available</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Group standings will be displayed here once matches are played.
                            </p>
                        </div>
                    )}

                    {/* Legend */}
                    <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Legend</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                                <span className="text-green-600 dark:text-green-400">✓</span>
                                <span className="text-gray-600 dark:text-gray-400">Qualified for playoffs</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">P:</span>
                                <span className="text-gray-600 dark:text-gray-400">Played</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">W/D/L:</span>
                                <span className="text-gray-600 dark:text-gray-400">Win/Draw/Loss</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">GF/GA/GD:</span>
                                <span className="text-gray-600 dark:text-gray-400">Goals For/Against/Difference</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}