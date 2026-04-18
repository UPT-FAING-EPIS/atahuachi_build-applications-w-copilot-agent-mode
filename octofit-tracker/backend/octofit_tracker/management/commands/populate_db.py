from django.core.management.base import BaseCommand
from django.conf import settings
from djongo import models
from django.contrib.auth.models import User
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Conexión directa a MongoDB para manipulación de colecciones
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']

        # Eliminar datos previos
        db.users.delete_many({})
        db.teams.delete_many({})
        db.activities.delete_many({})
        db.leaderboard.delete_many({})
        db.workouts.delete_many({})

        # Equipos
        teams = [
            {"name": "Marvel", "description": "Team Marvel"},
            {"name": "DC", "description": "Team DC"}
        ]
        team_ids = db.teams.insert_many(teams).inserted_ids

        # Usuarios
        users = [
            {"name": "Iron Man", "email": "ironman@marvel.com", "team": "Marvel"},
            {"name": "Spider-Man", "email": "spiderman@marvel.com", "team": "Marvel"},
            {"name": "Batman", "email": "batman@dc.com", "team": "DC"},
            {"name": "Wonder Woman", "email": "wonderwoman@dc.com", "team": "DC"}
        ]
        db.users.insert_many(users)

        # Actividades
        activities = [
            {"user": "Iron Man", "activity": "Running", "duration": 30},
            {"user": "Spider-Man", "activity": "Cycling", "duration": 45},
            {"user": "Batman", "activity": "Swimming", "duration": 60},
            {"user": "Wonder Woman", "activity": "Yoga", "duration": 50}
        ]
        db.activities.insert_many(activities)

        # Leaderboard
        leaderboard = [
            {"user": "Iron Man", "points": 100},
            {"user": "Spider-Man", "points": 90},
            {"user": "Batman", "points": 95},
            {"user": "Wonder Woman", "points": 98}
        ]
        db.leaderboard.insert_many(leaderboard)

        # Workouts
        workouts = [
            {"user": "Iron Man", "workout": "Pushups", "reps": 50},
            {"user": "Spider-Man", "workout": "Pullups", "reps": 30},
            {"user": "Batman", "workout": "Squats", "reps": 40},
            {"user": "Wonder Woman", "workout": "Lunges", "reps": 35}
        ]
        db.workouts.insert_many(workouts)

        # Índice único en email
        db.users.create_index([("email", 1)], unique=True)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
