import mysql.connector # type: ignore

class API:

    def __init__(self, host, user, password, database):
        self.mydb = None
        self.host = host
        self.user = user
        self.password = password
        self.database = database
        
    def connect(self):
        self.mydb = mysql.connector.connect(
            host=self.host,
            user=self.user,
            password=self.password,
            database=self.database
        )
    
    def get_users(self):
        self.connect()
        mycursor = self.mydb.cursor()
        mycursor.execute("SELECT * FROM tt_account")
        myresult = mycursor.fetchall()
        return myresult
    
    def get_user(self, username, password):
        self.connect()
        mycursor = self.mydb.cursor()
        mycursor.execute(f"SELECT * FROM tt_account WHERE username = '{username}' AND password = '{password}'")
        myresult = mycursor.fetchall()
        return myresult
    
    def update_user(self, id, username, password):
        self.connect()
        mycursor = self.mydb.cursor()
        mycursor.callproc('UpdateAccountCredentials', [id, username, password])
        self.mydb.commit()
        return mycursor.lastrowid
    
    def add_user(self, username, password):
        self.connect()
        mycursor = self.mydb.cursor()
        try :
            mycursor.callproc('AddAccountCredentials', [username, password])
            self.mydb.commit()
            return mycursor.lastrowid
        except:
            return None
    
    def add_person(self, user_id, first_name, last_name, grad_date, join_date, birthday, title):
        self.connect()
        mycursor = self.mydb.cursor()
        mycursor.callproc('AddPerson', [user_id, first_name, last_name, grad_date, join_date, birthday, title])
        self.mydb.commit()
        return mycursor.lastrowid
    
    def get_person(self, id):
        self.connect()
        mycursor = self.mydb.cursor()
        try:
            mycursor.execute(f"SELECT * FROM person WHERE id = {id}")
            myresult = mycursor.fetchall()
            return myresult
        except:
            return None
    
    def update_person(self, profile_json, id):
        self.connect()
        mycursor = self.mydb.cursor()
        mycursor.callproc('UpdatePersonProfile', [id, profile_json['firstName'], profile_json['lastName'], profile_json['title']])
        self.mydb.commit()
        return mycursor.lastrowid
    
    def get_trap(self, id):
        self.connect()
        mycursor = self.mydb.cursor()
        print(id)
        mycursor.callproc('GetTrapDetailsByPerson', [id])
       
        for result in mycursor.stored_results():
            myresult = result.fetchall()
        return myresult
    
    def get_trap_game(self, id):
        self.connect()
        mycursor = self.mydb.cursor()
        mycursor.execute(f"SELECT * FROM trap WHERE tgid = {id}")
        myresult = mycursor.fetchall()
        return myresult
    
    def delete_trap(self, id):
        self.connect()
        mycursor = self.mydb.cursor()
        mycursor.execute(f"DELETE FROM trap WHERE tgid = {id}")
        self.mydb.commit()
        return mycursor.lastrowid
    
    def add_person_plays_trap(self, person_id, trap_id):
        self.connect()
        mycursor = self.mydb.cursor()
        mycursor.execute(f"INSERT INTO person_plays_trap (pid, tgid) VALUES ({person_id}, {trap_id})")
        self.mydb.commit()
        return mycursor.lastrowid
    
    def get_person_id(self, first_name, last_name):
        self.connect()
        mycursor = self.mydb.cursor()
        mycursor.execute(f"SELECT id FROM person WHERE first_name = '{first_name}' AND last_name = '{last_name}'")
        myresult = mycursor.fetchall()
        return myresult[0][0]
    
    def add_trap(self, game_json):
        self.connect()
        mycursor = self.mydb.cursor()
        print("got here")
        try:
            args = [game_json['station1'], game_json['station2'], game_json['station3'], game_json['station4'], game_json['station5'], game_json['date_played'], game_json['location'], game_json['score']]
            mycursor.callproc('InsertTrapGame', args)
            self.mydb.commit()
            mycursor.execute("SELECT MAX(tgid) FROM trap")
            last_id = mycursor.fetchall()[0][0]
            person_id = self.get_person_id(game_json['firstName'], game_json['lastName'])
            self.add_person_plays_trap(person_id, last_id)
        except mysql.connector.Error as err:
            print(f"Error: {err}")
       


    def update_trap(self, game_json, id):
        self.connect()
        mycursor = self.mydb.cursor()
        mycursor.execute(f"UPDATE trap SET station_1_hit = {game_json['station1']}, station_2_hit = {game_json['station2']}, station_3_hit = {game_json['station3']}, station_4_hit = {game_json['station4']}, station_5_hit = {game_json['station5']}, clays_hit = {game_json['score']} WHERE tgid = {id}")
        self.mydb.commit()
        return mycursor.lastrowid
    
   
        


if __name__ == "__main__":
    api = API()
    print(api.get_users())