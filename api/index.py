import os
from fastapi import FastAPI, Depends  # type: ignore
from fastapi.responses import StreamingResponse  # type: ignore
from pydantic import BaseModel  # type: ignore
from fastapi_clerk_auth import ClerkConfig, ClerkHTTPBearer, HTTPAuthorizationCredentials  # type: ignore
from openai import OpenAI  # type: ignore

app = FastAPI()
clerk_config = ClerkConfig(jwks_url=os.getenv("CLERK_JWKS_URL"))
clerk_guard = ClerkHTTPBearer(clerk_config)


class WorkoutRequest(BaseModel):
    age: int
    weight: int
    sex: str
    fitness_level: str
    goal: str
    available_time: int
    equipment: str


system_prompt = """
You are a professional fitness coach and personal trainer with 20 years of experience.
You will create personalized workout plans based on user information.

Generate a detailed, safe, and effective workout plan.
Format the response with clear sections:
### Workout Plan Overview
Brief intro about the workout focusing on their goal and fitness level.

### Warm-up (5 minutes)
List 3-4 warm-up exercises with reps/duration.

### Main Workout
List exercises with:
- Exercise name
- Sets x Reps (or duration)
- Rest time between sets
- Form tips or modifications

### Cool-down (5 minutes)
List 2-3 cool-down/stretching exercises.

### Notes
Safety tips, progression suggestions, and any modifications based on their age/fitness level.
"""


def user_prompt_for(req: WorkoutRequest) -> str:
    return f"""Create a personalized {req.available_time}-minute workout plan for:
Age: {req.age}
Weight: {req.weight} lbs
Sex: {req.sex}
Fitness Level: {req.fitness_level}
Goal: {req.goal}
Available Equipment: {req.equipment}

Make sure the workout is appropriate for their age and fitness level. Include modifications if needed."""


@app.post("/api")
def generate_workout(
    workout_req: WorkoutRequest,
    creds: HTTPAuthorizationCredentials = Depends(clerk_guard),
):
    user_id = creds.decoded["sub"]  # User ID for tracking/auditing
    client = OpenAI()

    user_prompt = user_prompt_for(workout_req)

    prompt = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt},
    ]

    stream = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=prompt,
        stream=True,
    )

    def event_stream():
        for chunk in stream:
            text = chunk.choices[0].delta.content
            if text:
                lines = text.split("\n")
                for line in lines[:-1]:
                    yield f"data: {line}\n\n"
                    yield "data:  \n"
                yield f"data: {lines[-1]}\n\n"

    return StreamingResponse(event_stream(), media_type="text/event-stream")