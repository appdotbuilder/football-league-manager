import React from 'react';
import { Head, Link } from '@inertiajs/react';

interface Club {
    id: number;
    name: string;
    short_name: string;
    city?: string;
    description?: string;
    logo?: string;
    groups: Array<{
        id: number;
        name: string;
    }>;
    players: Array<{
        id: number;
        name: string;
        jersey_number: number;
        position: string;
    }>;
}

interface Props {
    clubs: Club[];
    [key: string]: unknown;
}

export default function Clubs({ clubs = [] }: Props) {
    const getPositionColor = (position: string) => {
        switch (position.toUpperCase()) {
            case 'GK':
                return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200';
            case 'CB':
            case 'LB':
            case 'RB':
                return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200';
            case 'CDM':
            case 'CM':
            case 'CAM':
                return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
            case 'LW':
            case 'RW':
            case 'ST':
                return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200';
            default:
                return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
        }
    };

    return (
        <>
            <Head title="Clubs - Football League" />
            
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
                                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Clubs</h2>
                            </div>
                            
                            <nav className="flex items-center space-x-6">
                                <Link href={route('home')} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Home</Link>
                                <Link href={route('groups')} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Groups</Link>
                                <Link href={route('playoffs')} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Playoffs</Link>
                                <Link href={route('livescores')} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Live</Link>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">🏟️ Football Clubs</h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Explore all clubs in the league, their groups, and player rosters.
                        </p>
                    </div>

                    {clubs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {clubs.map((club) => (
                                <div key={club.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow">
                                    {/* Club Header */}
                                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                                {club.logo ? (
                                                    <img 
                                                        src={club.logo} 
                                                        alt={`${club.name} logo`} 
                                                        className="w-12 h-12 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-2xl font-bold">
                                                        {club.short_name}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-xl font-bold truncate">{club.name}</h3>
                                                <p className="text-blue-200 text-sm">
                                                    {club.city || 'Football Club'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        {/* Groups */}
                                        {club.groups.length > 0 && (
                                            <div className="mb-4">
                                                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Groups</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {club.groups.map((group) => (
                                                        <span 
                                                            key={group.id}
                                                            className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                                                        >
                                                            {group.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Description */}
                                        {club.description && (
                                            <div className="mb-4">
                                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                                                    {club.description}
                                                </p>
                                            </div>
                                        )}

                                        {/* Player Count and Top Players */}
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                    Squad ({club.players.length} players)
                                                </h4>
                                                {club.players.length > 3 && (
                                                    <Link
                                                        href={route('clubs.show', club.id)}
                                                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                                                    >
                                                        View all
                                                    </Link>
                                                )}
                                            </div>
                                            
                                            {club.players.length > 0 ? (
                                                <div className="space-y-2">
                                                    {club.players.slice(0, 3).map((player) => (
                                                        <div key={player.id} className="flex items-center justify-between text-sm">
                                                            <div className="flex items-center space-x-2">
                                                                <span className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold">
                                                                    {player.jersey_number}
                                                                </span>
                                                                <span className="font-medium text-gray-900 dark:text-white">
                                                                    {player.name}
                                                                </span>
                                                            </div>
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPositionColor(player.position)}`}>
                                                                {player.position}
                                                            </span>
                                                        </div>
                                                    ))}
                                                    {club.players.length > 3 && (
                                                        <div className="text-xs text-gray-500 dark:text-gray-400 text-center pt-2">
                                                            +{club.players.length - 3} more players
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                                                    No players registered
                                                </p>
                                            )}
                                        </div>

                                        {/* View Club Button */}
                                        <Link
                                            href={route('clubs.show', club.id)}
                                            className="w-full inline-flex justify-center items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                                        >
                                            View Club Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
                            <div className="text-6xl mb-4">🏟️</div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Clubs Available</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                No football clubs are currently registered in the league.
                            </p>
                        </div>
                    )}

                    {/* Stats Summary */}
                    {clubs.length > 0 && (
                        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
                                📊 League Statistics
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                        {clubs.length}
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-400">Total Clubs</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                        {clubs.reduce((sum, club) => sum + club.players.length, 0)}
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-400">Total Players</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                        {Math.round(clubs.reduce((sum, club) => sum + club.players.length, 0) / clubs.length) || 0}
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-400">Avg Squad Size</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                                        {new Set(clubs.flatMap(club => club.groups.map(g => g.id))).size}
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-400">Active Groups</div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}