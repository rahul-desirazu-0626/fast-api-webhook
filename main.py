from fastapi import FastAPI, Request

app = FastAPI()

@app.post("/receive-payload/")
async def receive_payload(inptu: str, request: Request):
    payload = await request.body()
    
    print("\nPayload:")
    print(payload.decode(errors="ignore"))
    
    with open("received_payload.txt", "wb") as f:
        f.write(payload)

    return {"message": "Payload received "}
