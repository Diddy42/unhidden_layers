from mobilenet import Model

m = Model()

inference = m.infer('1.jpg')

print(inference)

