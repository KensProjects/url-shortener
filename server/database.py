import sqlite3
from uuid import uuid4
from nanoid import generate

short_url = generate("1234567890abcdef", 10)

conn = sqlite3.connect("url.db", check_same_thread=False)

cur = conn.cursor()


def transform_data(data: tuple):
    return {"id": data[0], "original_url": data[1], "shortened_url": data[2]}


def start_db():
    cur.execute(
        "CREATE TABLE IF NOT EXISTS url (id TEXT PRIMARY KEY, original_url TEXT NOT NULL UNIQUE, shortened_url TEXT NOT NULL UNIQUE)"
    )


def get_redirect_url(short_url: str):

    cur.execute(f"SELECT * FROM url WHERE shortened_url = '{short_url}' LIMIT 1")
    data = cur.fetchone()
    if data != None:
        return transform_data(data)
    else:
        return "error"


def create_short_url(original_url: str):
    cur.execute(
        f"""
                INSERT INTO url (id, original_url, shortened_url) VALUES ('{str(uuid4())}', '{original_url}', "{ generate("1234567890abcdef", 10)}") 
                """
    )
    conn.commit()
    cur.execute("SELECT * from url WHERE rowid =  last_insert_rowid()")
    data = transform_data(cur.fetchone())
    return data


def check_url(original_url: str):
    cur.execute(
        f"""
                SELECT * from url WHERE original_url = '{original_url}'
                """
    )
    data = cur.fetchone()
    if data != None:
        return transform_data(data)
    else:
        return create_short_url(original_url)
