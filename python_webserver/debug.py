from mobilenet import Model

m = Model()

inference = m.infer('file-20220131-15-1ndq1m6.avif')

print(inference)

