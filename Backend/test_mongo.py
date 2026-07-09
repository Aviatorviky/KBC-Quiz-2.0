from pymongo import MongoClient

uri = "mongodb+srv://AviatorViky:9540732250@cluster0.ypmsllw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(uri)

try:
    client.admin.command("ping")
    print("✅ Connected successfully!")
except Exception as e:
    print("❌ Connection failed:")
    print(e)