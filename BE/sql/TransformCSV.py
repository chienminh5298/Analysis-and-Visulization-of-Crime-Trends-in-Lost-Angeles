import csv
import re
from datetime import datetime

# Varchar2 lengths
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
    with open(inFile, mode='r', newline='') as csvFile:  # Open file in read mode
        if not csvFile.closed:
            print("The file is open.")
        else:
            print("The file is closed.")

        reader = csv.DictReader(csvFile)

        with open(outFile, mode='w', encoding='utf-8') as sqlFile:
            # Need to do 1 loop for each table
            for row in reader:
                SQLInsert = "" # Insert command goes here
                sqlFile.write(SQLInsert)

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
    row['TIME OCC'] = "NULL" if (row['SALES'] == '') else round(float(row['SALES']), 2)
    row['AREA'] = -1 if (row['AREA'] == '') else int(row['AREA'])
    row['AREA NAME'] = "NoArea" if (row['AREA NAME'] == '') else truncateString(
        re.sub(r"[']", "''", row['AREA NAME']), AREA)
    row['Rpt Dist No'] = "NULL" if (row['Rpt Dist No']) else int(row['Rpt Dist No'])
    row['Crm Cd'] = -1 if (row['Crm Cd']) else int(row['Crm Cd'])
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
def generateSQLInsert(row):
    formatRows(row)
    insertLine = "" # formatted string goes here

    return insertLine

# main
inFile = 'Crime_Data_from_2020_to_Present.csv'
outFile = 'Proj_Insert_Commands.sql'

writeCSVtoSQL(inFile, outFile)