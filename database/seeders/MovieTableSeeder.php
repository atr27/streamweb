<?php

namespace Database\Seeders;

use App\Models\Movie;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class MovieTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $movies = [
            [
                'title' => 'Oppenheimer',
                'genre' => 'Biography',
                'description' => 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
                'duration' => '03:00:00',
                'release_year' => 2023,
                'rating' => 9.3,
                'thumbnail' => 'https://posterspy.com/wp-content/uploads/2023/08/Oppenheimer-PosterSpy-4.jpg',
                'video_url' => 'https://www.youtube.com/watch?v=uYPbbksJxIg',
                'is_featured' => true
            ],
            [
                'title' => 'Barbie',
                'genre' => 'Comedy',
                'description' => 'Barbie suffers a crisis that leads her to question her world and her existence.',
                'duration' => '02:00:00',
                'release_year' => 2023,
                'rating' => 8.8,
                'thumbnail' => 'https://posterspy.com/wp-content/uploads/2024/07/Barbie.jpg',
                'video_url' => 'https://www.youtube.com/watch?v=pBk4NYhWNMM',
                'is_featured' => false
            ],
            [
                'title' => 'Guardians of the Galaxy Vol. 3',
                'genre' => 'Action',
                'description' => 'Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and one of their own - a mission that could mean the end of the Guardians if not successful.',
                'duration' => '02:30:00',
                'release_year' => 2023,
                'rating' => 8.9,
                'thumbnail' => 'https://posterspy.com/wp-content/uploads/2023/05/guardians-of-the-galaxy-vol-3-poster.jpg',
                'video_url' => 'https://www.youtube.com/watch?v=u3V5KDHRQvk',
                'is_featured' => false
            ],
            [
                'title' => 'John Wick: Chapter 4',
                'genre' => 'Action',
                'description' => 'John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe.',
                'duration' => '02:49:00',
                'release_year' => 2023,
                'rating' => 8.7,
                'thumbnail' => 'https://posterspy.com/wp-content/uploads/2023/04/JohnWickCHPTR4_Poster02_Design.jpg',
                'video_url' => 'https://www.youtube.com/watch?v=qEVUtrk8_B4',
                'is_featured' => false
            ],
            [
                'title' => 'The Super Mario Bros. Movie',
                'genre' => 'Animation',
                'description' => 'A plumber named Mario travels through an underground labyrinth with his brother, Luigi, trying to save a captured princess.',
                'duration' => '01:32:00',
                'release_year' => 2023,
                'rating' => 8.5,
                'thumbnail' => 'https://posterspy.com/wp-content/uploads/2023/05/mariobrosmovie-poster-julienricojr-WEB.jpg',
                'video_url' => 'https://www.youtube.com/watch?v=TnGl01FkMMo',
                'is_featured' => false
            ],
            [
                'title' => 'Spider-Man: Across the Spider-Verse',
                'genre' => 'Animation',
                'description' => 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
                'duration' => '02:20:00',
                'release_year' => 2023,
                'rating' => 9.0,
                'thumbnail' => 'https://posterspy.com/wp-content/uploads/2023/04/SPIDERMAN-ACROSS-POSTEr.jpg',
                'video_url' => 'https://www.youtube.com/watch?v=cqGjhVJWtEg',
                'is_featured' => false
            ],
            [
                'title' => 'Mission: Impossible - Dead Reckoning Part One',
                'genre' => 'Action',
                'description' => 'Ethan Hunt and his IMF team must track down a dangerous weapon before it falls into the wrong hands.',
                'duration' => '02:43:00',
                'release_year' => 2023,
                'rating' => 8.8,
                'thumbnail' => 'https://posterspy.com/wp-content/uploads/2023/07/MI7.jpg',
                'video_url' => 'https://www.youtube.com/watch?v=avz06PDqDbM',
                'is_featured' => false
            ],
            [
                'title' => 'Wonka',
                'genre' => 'Fantasy',
                'description' => 'The story focuses on a young Willy Wonka and how he came to meet the Oompa-Loompas on one of his earliest adventures.',
                'duration' => '02:00:00',
                'release_year' => 2023,
                'rating' => 8.4,
                'thumbnail' => 'https://posterspy.com/wp-content/uploads/2024/04/Wonka_JF02.jpg',
                'video_url' => 'https://www.youtube.com/watch?v=otNh9bTjXWg',
                'is_featured' => false
            ],
            [
                'title' => 'Aquaman and the Lost Kingdom',
                'genre' => 'Action',
                'description' => 'Black Manta seeks revenge on Aquaman for his father\'s death. Wielding the Black Trident\'s power, he becomes a formidable foe.',
                'duration' => '02:04:00',
                'release_year' => 2023,
                'rating' => 8.3,
                'thumbnail' => 'https://posterspy.com/wp-content/uploads/2023/09/Aquaman-2.jpg',
                'video_url' => 'https://www.youtube.com/watch?v=UGc5Tzz19UY',
                'is_featured' => false
            ],
            [
                'title' => 'Napoleon',
                'genre' => 'Biography',
                'description' => 'An epic that details the checkered rise and fall of French Emperor Napoleon Bonaparte and his relentless journey to power through the prism of his addictive, volatile relationship with his wife, Josephine.',
                'duration' => '02:38:00',
                'release_year' => 2023,
                'rating' => 8.5,
                'thumbnail' => 'https://posterspy.com/wp-content/uploads/2023/11/20B5D641-3CBE-4199-98D4-35ADBF047796.jpeg',
                'video_url' => 'https://www.youtube.com/watch?v=OAZWXUkrjPc',
                'is_featured' => false
            ],
            [
                'title' => 'Dune: Part Two',
                'genre' => 'Sci-Fi',
                'description' => 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
                'duration' => '02:45:00',
                'release_year' => 2024,
                'rating' => 9.1,
                'thumbnail' => 'https://posterspy.com/wp-content/uploads/2024/12/NerdDesigner_DunePartTwo.jpg',
                'video_url' => 'https://www.youtube.com/watch?v=Way9Dexny3w',
                'is_featured' => false
            ],
            [
                'title' => 'Madame Web',
                'genre' => 'Action',
                'description' => 'Cassandra Webb develops the power to see the future. Forced to confront revelations about her past, she forges a relationship with three young women bound for powerful destinies.',
                'duration' => '02:00:00',
                'release_year' => 2024,
                'rating' => 8.5,
                'thumbnail' => 'https://posterspy.com/wp-content/uploads/2024/02/MadameWebV3.jpg',
                'video_url' => 'https://www.youtube.com/watch?v=s_76M4c4LTo',
                'is_featured' => true
            ],
            [
                'title' => 'Godzilla x Kong: The New Empire',
                'genre' => 'Action',
                'description' => 'Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins and connection to Skull Island\'s mysteries.',
                'duration' => '02:35:00',
                'release_year' => 2024,
                'rating' => 8.6,
                'thumbnail' => 'https://posterspy.com/wp-content/uploads/2023/12/GXK.jpg',
                'video_url' => 'https://www.youtube.com/watch?v=lV1OOlGwExM',
                'is_featured' => false
            ],
            [
                'title' => 'Inside Out 2',
                'genre' => 'Animation',
                'description' => 'Follow Riley, now a teenager, as new emotions join Joy, Sadness, Anger, Fear, and Disgust in headquarters.',
                'duration' => '01:55:00',
                'release_year' => 2024,
                'rating' => 8.7,
                'thumbnail' => 'https://posterspy.com/wp-content/uploads/2024/06/insideout2_small.jpg',
                'video_url' => 'https://www.youtube.com/watch?v=LEjhY15eCx0',
                'is_featured' => true
            ],
            [
                'title' => 'Deadpool 3',
                'genre' => 'Action',
                'description' => 'The merc with a mouth teams up with Wolverine in a multiverse-spanning adventure that will change both their lives forever.',
                'duration' => '02:15:00',
                'release_year' => 2024,
                'rating' => 9.0,
                'thumbnail' => 'https://posterspy.com/wp-content/uploads/2024/03/deadpool-3.jpg',
                'video_url' => 'https://www.youtube.com/watch?v=73_1biulkYk',
                'is_featured' => true
            ]
        ];

        foreach ($movies as $movie) {
            Movie::create(array_merge($movie, [
                'slug' => Str::slug($movie['title'])
            ]));
        }
    }
}
