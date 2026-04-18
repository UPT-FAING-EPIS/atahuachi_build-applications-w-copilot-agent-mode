from django.test import TestCase
from .models import UserProfile, Team, Activity, Leaderboard, Workout

class UserProfileTestCase(TestCase):
    def setUp(self):
        UserProfile.objects.create(name="Test User", email="test@example.com", team="Marvel")
    def test_user_created(self):
        user = UserProfile.objects.get(email="test@example.com")
        self.assertEqual(user.name, "Test User")

class TeamTestCase(TestCase):
    def setUp(self):
        Team.objects.create(name="Marvel", description="Team Marvel")
    def test_team_created(self):
        team = Team.objects.get(name="Marvel")
        self.assertEqual(team.description, "Team Marvel")

class ActivityTestCase(TestCase):
    def setUp(self):
        Activity.objects.create(user="Test User", activity="Running", duration=30)
    def test_activity_created(self):
        activity = Activity.objects.get(user="Test User")
        self.assertEqual(activity.activity, "Running")

class LeaderboardTestCase(TestCase):
    def setUp(self):
        Leaderboard.objects.create(user="Test User", points=100)
    def test_leaderboard_created(self):
        lb = Leaderboard.objects.get(user="Test User")
        self.assertEqual(lb.points, 100)

class WorkoutTestCase(TestCase):
    def setUp(self):
        Workout.objects.create(user="Test User", workout="Pushups", reps=50)
    def test_workout_created(self):
        workout = Workout.objects.get(user="Test User")
        self.assertEqual(workout.workout, "Pushups")
