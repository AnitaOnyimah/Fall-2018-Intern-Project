import csv
import numpy as np
from scipy import stats
from matplotlib import pyplot as plt

sum161 = 0.0
sum162 = 0.0
sum163 = 0.0
sum164 = 0.0
sum171 = 0.0
sum172 = 0.0
sum173 = 0.0
sum174 = 0.0
sum181 = 0.0
sum182 = 0.0
sum183 = 0.0
sum184 = 0.0
sum191 = 0.0
sum192 = 0.0

with open('/Users/anitaonyimah/Desktop/currentEx.csv', 'r') as infile:
    reader = csv.reader(infile)
    next(reader, None)
    for row in reader:
        if row[0] == '2016 1':
            sum161 += float(row[1])
        if row[0] == '2016 2':
            sum162 += float(row[1])
        if row[0] == '2016 3':
            sum163 += float(row[1])
        if row[0] == '2016 4':
            sum164 += float(row[1])
        if row[0] == '2017 1':
            sum171 += float(row[1])
        if row[0] == '2017 2':
            sum172 += float(row[1])
        if row[0] == '2017 3':
            sum173 += float(row[1])
        if row[0] == '2017 4':
            sum174 += float(row[1])
        if row[0] == '2018 1':
            sum181 += float(row[1])
        if row[0] == '2018 2':
            sum182 += float(row[1])
        if row[0] == '2018 3':
            sum183 += float(row[1])
        if row[0] == '2018 4':
            sum184 += float(row[1])
        if row[0] == '2019 1':
            sum191 += float(row[1])
        if row[0] == '2019 2':
            sum192 += float(row[1])

x_ticks_labels = ['2016 Q1', '2016 Q2', '2016 Q3', '2016 Q4', '2017 Q1', '2017 Q2', '2017 Q3', '2017 Q4', '2018 Q1',
                  '2018 Q2', '2018 Q3', '2018 Q4', '2019 Q1', '2019 Q2', '2019 Q3', '2019 Q4', '2020 Q1']
new_x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
new_y = [sum161, sum162, sum163, sum164, sum171, sum172, sum173, sum174, sum181, sum182, sum183, 992626.75]

print(new_x)
print(new_y)

plt.xticks(new_x)
plt.yticks()

new_x = np.array(new_x)
new_y = np.array(new_y)

plt.plot(new_x, new_y, 'ro', color='black')

plt.ylabel('Revenue')
plt.xlabel('Quarter Since Start of Remesh')
plt.title('Revenue Per Quarter Since Start of Remesh')

slope, intercept, r_value, p_value, std_error = stats.linregress(new_x, new_y)
plt.plot(new_x, ((new_x*slope)+intercept), 'b')

plt.plot(new_x, new_y, 'ro', color='black')

#prediction

newX = 12
newY = newX*slope+intercept
plt.plot(newX, newY, 'ro', color='red')
print(newY)
