import json
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class PrizeInfo(BaseModel):
    rank: int
    badge: str
    prize_title: str
    prize_description: str

class LeaderboardEntry(BaseModel):
    rank: int
    student_id: str
    student_name: str
    target_exam: str  # "JEE Main", "JEE Advanced", "NEET"
    dream_college: str # e.g. "IIT Bombay", "AIIMS Delhi"
    xp_points: int
    streak_count: int
    questions_solved: int
    accuracy_percentage: float
    prize: Optional[PrizeInfo] = None

# Legendary Prizes Configuration
LEGENDARY_PRIZES = {
    1: PrizeInfo(
        rank=1,
        badge="🥇 RANK 1",
        prize_title="100% Scholarship + iPad & Grand Trophy",
        prize_description="Full 1-Year Coaching Scholarship + Apple iPad Air + Golden SocraticAI Trophy"
    ),
    2: PrizeInfo(
        rank=2,
        badge="🥈 RANK 2",
        prize_title="Full Test Series Pass & Hardcopy Book Bundle",
        prize_description="Complete All-India Mock Test Series + Physical Book Set (Physics, Chemistry, Math/Bio)"
    ),
    3: PrizeInfo(
        rank=3,
        badge="🥉 RANK 3",
        prize_title="1-Year Premium Pass & Official Swag Kit",
        prize_description="12 Months SocraticAI Unlimited Pro Pass + Official SocraticAI Hoodie & Merch Kit"
    )
}

# Initial Mock Leaderboard Data (Byju's / Allen style competitive leaderboard)
INITIAL_LEADERBOARD: List[Dict[str, Any]] = [
    {
        "student_id": "STU_101",
        "student_name": "Aarav Sharma",
        "target_exam": "JEE Advanced",
        "dream_college": "IIT Bombay (Computer Science)",
        "xp_points": 4850,
        "streak_count": 14,
        "questions_solved": 142,
        "accuracy_percentage": 94.5
    },
    {
        "student_id": "STU_102",
        "student_name": "Ananya Patel",
        "target_exam": "NEET UG",
        "dream_college": "AIIMS New Delhi",
        "xp_points": 4320,
        "streak_count": 12,
        "questions_solved": 130,
        "accuracy_percentage": 92.0
    },
    {
        "student_id": "STU_103",
        "student_name": "Rohan Gupta",
        "target_exam": "JEE Main",
        "dream_college": "NIT Trichy",
        "xp_points": 3980,
        "streak_count": 9,
        "questions_solved": 115,
        "accuracy_percentage": 89.2
    },
    {
        "student_id": "STU_104",
        "student_name": "Priyanjali Sen",
        "target_exam": "NEET UG",
        "dream_college": "JIPMER Puducherry",
        "xp_points": 3450,
        "streak_count": 7,
        "questions_solved": 98,
        "accuracy_percentage": 87.5
    },
    {
        "student_id": "STU_105",
        "student_name": "Vikramaditya Verma",
        "target_exam": "JEE Advanced",
        "dream_college": "IIT Delhi (Electrical)",
        "xp_points": 3120,
        "streak_count": 6,
        "questions_solved": 88,
        "accuracy_percentage": 85.0
    }
]

class LeaderboardManager:
    """
    Manages Student Leaderboard, XP calculation, Streaks, and Legendary Prizes.
    """
    def __init__(self):
        self.entries: List[LeaderboardEntry] = []
        self._initialize_leaderboard()

    def _initialize_leaderboard(self):
        for data in INITIAL_LEADERBOARD:
            entry = LeaderboardEntry(**data)
            self.entries.append(entry)
        self._recalculate_ranks()

    def _recalculate_ranks(self):
        # Sort descending by XP points
        self.entries.sort(key=lambda x: x.xp_points, reverse=True)
        for idx, entry in enumerate(self.entries, start=1):
            entry.rank = idx
            if idx in LEGENDARY_PRIZES:
                entry.prize = LEGENDARY_PRIZES[idx]
            else:
                entry.prize = None

    def calculate_xp_earned(
        self,
        is_correct: bool,
        streak: int,
        difficulty: str = "MEDIUM"
    ) -> int:
        """
        Calculates XP points earned for a problem attempt:
        - Base: 100 XP
        - Streak Bonus: +20 XP per consecutive streak (max +100)
        - Difficulty Multiplier: Easy (+0), Medium (+25), JEE Advanced / Hard (+50)
        """
        if not is_correct:
            return 0  # Zero penalty - "encouragement first"

        base_xp = 100
        streak_bonus = min(streak * 20, 100)
        
        diff_upper = difficulty.upper()
        if "ADVANCED" in diff_upper or "HARD" in diff_upper:
            diff_bonus = 50
        elif "MEDIUM" in diff_upper:
            diff_bonus = 25
        else:
            diff_bonus = 0

        return base_xp + streak_bonus + diff_bonus

    def record_student_doubt_attempt(
        self,
        student_id: str,
        student_name: str,
        target_exam: str,
        dream_college: str,
        is_correct: bool = True,
        difficulty: str = "MEDIUM"
    ) -> Tuple[LeaderboardEntry, int]:
        """
        Updates student stats or creates new student entry, calculates XP, and assigns updated Rank & Prize.
        """
        # Find existing student or create new
        student_entry = next((e for e in self.entries if e.student_id == student_id), None)
        
        if not student_entry:
            student_entry = LeaderboardEntry(
                rank=len(self.entries) + 1,
                student_id=student_id,
                student_name=student_name,
                target_exam=target_exam,
                dream_college=dream_college,
                xp_points=0,
                streak_count=0,
                questions_solved=0,
                accuracy_percentage=100.0
            )
            self.entries.append(student_entry)

        # Update stats
        if is_correct:
            student_entry.streak_count += 1
            student_entry.questions_solved += 1
            xp_earned = self.calculate_xp_earned(is_correct=True, streak=student_entry.streak_count, difficulty=difficulty)
            student_entry.xp_points += xp_earned
        else:
            student_entry.streak_count = 0
            xp_earned = 0

        self._recalculate_ranks()
        return student_entry, xp_earned

    def get_top_leaderboard(self, limit: int = 5) -> List[LeaderboardEntry]:
        """Returns Top N leaderboard entries."""
        return self.entries[:limit]

leaderboard_manager = LeaderboardManager()

if __name__ == "__main__":
    print("=== Testing Gamified Leaderboard & Legendary Prizes ===")
    top_entries = leaderboard_manager.get_top_leaderboard(3)
    for e in top_entries:
        print(f"{e.prize.badge}: {e.student_name} ({e.xp_points} XP) - Prize: {e.prize.prize_title}")
