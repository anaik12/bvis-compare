library(plyr)
library(signal)

timecourse <- read.csv("C:/Workspace/bvis/point/data/time_courses.csv")
# 
# filter <- lowpassFilter(type = c("timecourse"), param, sr = 1, 
#                         len = NULL, shift = 0.5)

filter <- lowpassfilter(type = "bessel", param = list(pole = 4L, cutoff = 1e3 / 1e4),
                        sr = 1e4)

lowpassFilter(type = c("bessel"), param, sr = 1, len = NULL, shift = 0.5)

a<-noisew(f=8000,d=1)
b<-ffilter(a,f=8000,to=1500)

