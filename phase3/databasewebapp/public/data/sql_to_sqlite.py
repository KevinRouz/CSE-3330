import sqlite3

# Open SQLite database connection
conn = sqlite3.connect("data.sqlite")
cursor = conn.cursor()

with open("project2.sql", "r") as sql_file:
    sql_script = sql_file.read()

# Execute the SQL script
cursor.executescript(sql_script)

conn.commit()
conn.close()