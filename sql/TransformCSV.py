import csv
import re
from datetime import datetime

# Define max length for Varchar2 fields
DRNO = 10
AREA = 50
STATUS = 2
VICTSEX = 1
VICTDESCENT = 35
LOCATIONADDRESS = 50
CROSSSTREET = 50
PREMISECODE = 30
PREMISEDESC = 50
WEAPONDESC = 50
STATUSDESC = 50
CRIMECODEDESC = 20
MODUS = 50

# Takes the CSV and writes an SQL file with insert statements
def writeCSVtoSQL(inFile, outFile):
    """Read CSV file, format data, and write SQL insert statements to output file."""
    try:
        
        with open(inFile, mode='r', newline='') as csvFile:  # Open file in read mode
            if not csvFile.closed:
                print("The file is open.")
            else:
                print("The file is closed.")

            reader = csv.DictReader(csvFile)

            # Open the output SQL file in write mode
            with open(outFile, mode='w', encoding='utf-8') as sqlFile:
                print("SQL file opened successfully for writing.")

                # Start with deferring constraints for bulk inserts
                sqlFile.write("SET CONSTRAINTS ALL DEFERRED;\n\n")

                # Need to do 1 loop for each table
                for row in reader:
                    formatRows(row) # Format each row to match SQL requirements
                    sqlFile.write(generateSQLInserts(row)) # Write SQL inserts for the row
                    sqlFile.write('\n\n')
                print(f"SQL insert statements successfully written to {outFile}")    

    except FileNotFoundError:
        print(f"Error: The file '{inFile}' was not found.")
    except Exception as e:
        print(f"An error occurred: {e}")


def truncateString(str, maxLength):
    if len(str) > maxLength:
        return str[:maxLength]
    else:
        return str

# Takes a particular row in the CSV and reformats the values to match SQL requirements + our schema
def formatRows(row):
    row['DR_NO'] = "NoDrNum" if (row['DR_NO'] == '') else truncateString(row['DR_NO'], DRNO)
    row['Date Rptd'] = "NULL" if (row['Date Rptd'] == '') else re.sub(r'(\d{1,2})/(\d{1,2})/(\d{4}) \d{1,2}:\d{2}', r'\3-\1-\2',
                                                                            row['Date Rptd'])
    row['DATE OCC'] = "NULL" if (row['Date Rptd'] == '') else re.sub(r'(\d{1,2})/(\d{1,2})/(\d{4}) \d{1,2}:\d{2}', r'\3-\1-\2',
                                                                            row['Date Rptd'])
    row['TIME OCC'] = "NULL" if row['TIME OCC'] == '' else str(round(float(row['TIME OCC']), 2))
    row['AREA'] = -1 if (row['AREA'] == '') else int(row['AREA'])
    row['AREA NAME'] = "NoArea" if (row['AREA NAME'] == '') else truncateString(
        re.sub(r"[']", "''", row['AREA NAME']), AREA)
    row['Rpt Dist No'] = "NULL" if row['Rpt Dist No'] == '' else int(row['Rpt Dist No'])    
    row['Crm Cd'] = -1 if row['Crm Cd'] == '' else int(row['Crm Cd'])
    row['Crm Cd Desc'] = "NULL" if (row['Crm Cd Desc'] == '') else truncateString(row['Crm Cd Desc'], CRIMECODEDESC)
    row['Mocodes'] = "NULL" if (row['Mocodes'] == '') else truncateString(row['Mocodes'], MODUS)
    row['Vict Age'] = "NULL" if (row['Vict Age'] == '') else int(row['Vict Age'])
    row['Vict Sex'] = "NULL" if (row['Vict Sex'] == '') else truncateString(row['Vict Sex'], VICTSEX)
    row['Vict Descent'] = "NULL" if (row['Vict Descent'] == '') else truncateString(row['Vict Descent'], VICTDESCENT)
    row['Premis Cd'] = "NoPremiseCode" if (row['Premis Cd'] == '') else truncateString(row['Premis Cd'], PREMISECODE)
    row['Premis Desc'] = "NULL" if (row['Premis Desc'] == '') else truncateString(row['Premis Desc'], PREMISEDESC)
    row['Weapon Used Cd'] = "NULL" if (row['Weapon Used Cd'] == '') else int(row['Weapon Used Cd'])
    row['Weapon Desc'] = "NULL" if (row['Weapon Desc'] == '') else truncateString(row['Weapon Desc'], WEAPONDESC)
    row['Status'] = "XX" if (row['Status'] == '') else truncateString(row['Status'], STATUS)
    row['Status Desc'] = "NULL" if (row['Status Desc'] == '') else truncateString(row['Status Desc'], STATUSDESC)
    row['Crm Cd 1'] = -1 if (row['Crm Cd 1'] == '') else int(row['Crm Cd 1'])
    row['Crm Cd 2'] = "NULL" if (row['Crm Cd 2'] == '') else int(row['Crm Cd 2'])
    row['Crm Cd 3'] = "NULL" if (row['Crm Cd 3'] == '') else int(row['Crm Cd 3'])
    row['Crm Cd 4'] = "NULL" if (row['Crm Cd 4'] == '') else int(row['Crm Cd 4'])
    row['LOCATION'] = "NULL" if (row['LOCATION'] == '') else truncateString(
        re.sub(r"[^\w\s,]", '', re.sub(r"[']", "''", row['LOCATION'])), LOCATIONADDRESS)
    row['Cross Street'] = "NULL" if (row['Cross Street'] == '') else truncateString(row['Cross Street'], CROSSSTREET)

# Make one function for each table
def generateSQLInserts(row):
    """Generate SQL insert statements for each table based on row data."""
    sql_statements = [
        f"INSERT INTO CrimeIncident (DR_NO, Area, Status) VALUES ('{row['DR_NO']}', '{row['AREA NAME']}', '{row['Status']}');",
        f"INSERT INTO Victim (DR_NO, Vict_Age, Vict_Sex, Vict_Descent) VALUES ('{row['DR_NO']}', {row['Vict Age']}, '{row['Vict Sex']}', '{row['Vict Descent']}');",
        f"INSERT INTO Location (Area, Area_Name, Rpt_Dist_No, Location_Addr, Cross_Street, Premis_Cd) VALUES ({row['AREA']}, '{row['AREA NAME']}', {row['Rpt Dist No']}, '{row['LOCATION']}', '{row['Cross Street']}', '{row['Premis Cd']}');",
        f"INSERT INTO Premise (Premise_Cd, Premise_Desc) VALUES ('{row['Premis Cd']}', '{row['Premis Desc']}');",
        f"INSERT INTO Time (DR_NO, Date_RPTD, Date_OCC, Time_OCC) VALUES ('{row['DR_NO']}', {row['Date Rptd']}, {row['DATE OCC']}, {row['TIME OCC']});",
        f"INSERT INTO Weapon (DR_NO, Weapon_Cd, Weapon_Desc) VALUES ('{row['DR_NO']}', {row['Weapon Used Cd']}, '{row['Weapon Desc']}');",
        f"INSERT INTO Status (Status_Cd, Status_Desc) VALUES ('{row['Status']}', '{row['Status Desc']}');",
        f"INSERT INTO IncidentCrimeCode (DR_NO, Crm_Cd, Crime_Cd_1, Crime_Cd_2, Crime_Cd_3, Crime_Cd_4) VALUES ('{row['DR_NO']}', {row['Crm Cd']}, {row['Crm Cd 1']}, {row['Crm Cd 2']}, {row['Crm Cd 3']}, {row['Crm Cd 4']});",
        f"INSERT INTO CrimeCode (Crm_Cd, Crm_Cd_Desc, Modus_Operandi_Cd) VALUES ({row['Crm Cd']}, '{row['Crm Cd Desc']}', '{row['Mocodes']}');"
    ]
    return "\n".join(sql_statements)

# main
inFile = 'Crime_Data_from_2020_to_Present.csv'
outFile = 'Proj_Insert_Commands.sql'

writeCSVtoSQL(inFile, outFile)