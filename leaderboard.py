import json
from typing import List, Dict, Any, Optional, Tuple
from pydantic import BaseModel, Field

class PrizeInfo(BaseModel):
    rank: int
    badge: str
    prize_title: str
    prize_description: str

class LeaderboardEntry(BaseModel):
    rank: Optional[int] = 0
    student_id: str
    student_name: str
    target_exam: str  # "JEE Main", "JEE Advanced", "NEET UG"
    dream_college: str # e.g. "IIT Bombay", "AIIMS Delhi"
    xp_points: int
    streak_count: int
    questions_solved: int
    accuracy_percentage: float
    prize: Optional[PrizeInfo] = None

# Zero-Cost ($0 Budget) Digital Legendary Prizes Configuration
LEGENDARY_PRIZES = {
    1: PrizeInfo(
        rank=1,
        badge="🥇 RANK 1",
        prize_title="Gold Champion Badge + Lifetime Pro Access",
        prize_description="Lifetime Free SocraticAI Pro Pass + Featured Spotlight Profile + Hall of Fame Digital Certificate ($0 Cost)."
    ),
    2: PrizeInfo(
        rank=2,
        badge="🥈 RANK 2",
        prize_title="1-Year Free Pro Pass + Master Formula PDFs",
        prize_description="12 Months Free Unlimited Doubt Resolution + Exclusive Formula Cheat Sheets PDF Package ($0 Cost)."
    ),
    3: PrizeInfo(
        rank=3,
        badge="🥉 RANK 3",
        prize_title="6-Month Free Pro Pass + Verified Scholar Badge",
        prize_description="6 Months Free Unlimited Doubt Resolution + Verified Scholar Digital Badge & Certificate ($0 Cost)."
    )
}

# Separate Mock Leaderboard Datasets for JEE & NEET Aspirants
JEE_LEADERBOARD_DATA: List[Dict[str, Any]] = [
    {
        "student_id": "JEE_101",
        "student_name": "Aarav Sharma",
        "target_exam": "JEE Advanced",
        "dream_college": "IIT Bombay (Computer Science)",
        "xp_points": 4850,
        "streak_count": 14,
        "questions_solved": 142,
        "accuracy_percentage": 94.5
    },
    {
        "student_id": "JEE_102",
        "student_name": "Rohan Gupta",
        "target_exam": "JEE Main",
        "dream_college": "NIT Trichy (CSE)",
        "xp_points": 3980,
        "streak_count": 9,
        "questions_solved": 115,
        "accuracy_percentage": 89.2
    },
    {
        "student_id": "JEE_103",
        "student_name": "Vikramaditya Verma",
        "target_exam": "JEE Advanced",
        "dream_college": "IIT Delhi (Electrical)",
        "xp_points": 3120,
        "streak_count": 6,
        "questions_solved": 88,
        "accuracy_percentage": 85.0
    },
    {
        "student_id": "JEE_104",
        "student_name": "Siddharth Nambiar",
        "target_exam": "JEE Advanced",
        "dream_college": "IIT Madras (Mechanical)",
        "xp_points": 2890,
        "streak_count": 5,
        "questions_solved": 81,
        "accuracy_percentage": 83.4
    },
    {
        "student_id": "JEE_105",
        "student_name": "Kavya Deshmukh",
        "target_exam": "JEE Main",
        "dream_college": "IIIT Hyderabad",
        "xp_points": 2650,
        "streak_count": 4,
        "questions_solved": 75,
        "accuracy_percentage": 82.1
    }
]

NEET_LEADERBOARD_DATA: List[Dict[str, Any]] = [
    {
        "student_id": "NEET_201",
        "student_name": "Ananya Patel",
        "target_exam": "NEET UG",
        "dream_college": "AIIMS New Delhi",
        "xp_points": 4920,
        "streak_count": 16,
        "questions_solved": 158,
        "accuracy_percentage": 96.2
    },
    {
        "student_id": "NEET_202",
        "student_name": "Priyanjali Sen",
        "target_exam": "NEET UG",
        "dream_college": "JIPMER Puducherry",
        "xp_points": 4150,
        "streak_count": 11,
        "questions_solved": 124,
        "accuracy_percentage": 91.5
    },
    {
        "student_id": "NEET_203",
        "student_name": "Devansh Reddy",
        "target_exam": "NEET UG",
        "dream_college": "KGMU Lucknow",
        "xp_points": 3760,
        "streak_count": 8,
        "questions_solved": 105,
        "accuracy_percentage": 88.7
    },
    {
        "student_id": "NEET_204",
        "student_name": "Meera Krishnan",
        "target_exam": "NEET UG",
        "dream_college": "MMC Chennai",
        "xp_points": 3320,
        "streak_count": 7,
        "questions_solved": 92,
        "accuracy_percentage": 86.4
    },
    {
        "student_id": "NEET_205",
        "student_name": "Ishaan Choudhury",
        "target_exam": "NEET UG",
        "dream_college": "VMMC New Delhi",
        "xp_points": 2980,
        "streak_count": 5,
        "questions_solved": 84,
        "accuracy_percentage": 84.1
    }
]

class LeaderboardManager:
    """
    Manages Separate Leaderboards for JEE and NEET Aspirants.
    """
    def __init__(self):
        self.jee_entries: List[LeaderboardEntry] = []
        self.neet_entries: List[LeaderboardEntry] = []
        self._initialize_leaderboards()

    def _initialize_leaderboards(self):
        for data in JEE_LEADERBOARD_DATA:
            self.jee_entries.append(LeaderboardEntry(**data))
        for data in NEET_LEADERBOARD_DATA:
            self.neet_entries.append(LeaderboardEntry(**data))
            
        self._recalculate_ranks(self.jee_entries)
        self._recalculate_ranks(self.neet_entries)

    def _recalculate_ranks(self, entries: List[LeaderboardEntry]):
        entries.sort(key=lambda x: x.xp_points, reverse=True)
        for idx, entry in enumerate(entries, start=1):
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
        if not is_correct:
            return 0

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
        is_neet = "NEET" in target_exam.upper()
        target_list = self.neet_entries if is_neet else self.jee_entries

        student_entry = next((e for e in target_list if e.student_id == student_id), None)
        
        if not student_entry:
            student_entry = LeaderboardEntry(
                rank=len(target_list) + 1,
                student_id=student_id,
                student_name=student_name,
                target_exam=target_exam,
                dream_college=dream_college,
                xp_points=0,
                streak_count=0,
                questions_solved=0,
                accuracy_percentage=100.0
            )
            target_list.append(student_entry)

        if is_correct:
            student_entry.streak_count += 1
            student_entry.questions_solved += 1
            xp_earned = self.calculate_xp_earned(is_correct=True, streak=student_entry.streak_count, difficulty=difficulty)
            student_entry.xp_points += xp_earned
        else:
            student_entry.streak_count = 0
            xp_earned = 0

        self._recalculate_ranks(target_list)
        return student_entry, xp_earned

    def get_top_leaderboard(self, exam_category: str = "JEE", limit: int = 5) -> List[LeaderboardEntry]:
        is_neet = "NEET" in exam_category.upper()
        target_list = self.neet_entries if is_neet else self.jee_entries
        return target_list[:limit]

leaderboard_manager = LeaderboardManager()

if __name__ == "__main__":
    print("=== Separate JEE & NEET Leaderboards ===")
    print("\n--- JEE Top Rankers ---")
    for e in leaderboard_manager.get_top_leaderboard("JEE", 3):
        print(f"#{e.rank} {e.student_name} ({e.dream_college}) - {e.xp_points} XP")
        
    print("\n--- NEET Top Rankers ---")
    for e in leaderboard_manager.get_top_leaderboard("NEET", 3):
        print(f"#{e.rank} {e.student_name} ({e.dream_college}) - {e.xp_points} XP")
