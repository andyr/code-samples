#!/usr/bin/env python

"""Using a charset of [a-z0-9] encode/decode ints
"""

def b36encode(num):
  """Encode from int to b36
  @param num: number
  @type: C{int}
  """
  alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'
  radix = len(alphabet)
  base36 = ''
  while num != 0:
    num, i = divmod(num, radix)
    base36 = alphabet[i] + base36
  return base36

def b36decode(b36):
  return int(b36, 36)


def main():
  # test harness
  num = 123456
  b36 = '2n9c'
  print b36 == b36encode(num)
  print num == b36decode(b36encode(num))


if __name__ == '__main__':
  main()
