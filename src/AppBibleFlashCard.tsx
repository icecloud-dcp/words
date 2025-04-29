import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { motion } from 'framer-motion'

const bibleVerses = [
  // 구원에 대한 구절
  {
    id: 1,
    category: '구원',
    verse: '요한복음 3:16',
    text: '하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라.',
  },
  {
    id: 2,
    category: '구원',
    verse: '로마서 3:23',
    text: '모든 사람이 죄를 범하였으매 하나님의 영광에 이르지 못하더니.',
  },
  {
    id: 3,
    category: '구원',
    verse: '로마서 6:23',
    text: '죄의 삯은 사망이요 하나님의 은사는 그리스도 예수 우리 주 안에 있는 영생이니라.',
  },
  {
    id: 4,
    category: '구원',
    verse: '요한일서 1:9',
    text: '만일 우리가 우리 죄를 자백하면 그는 미쁘시고 의로우사 우리 죄를 사하시며 우리를 모든 불의에서 깨끗하게 하실 것이요.',
  },
  {
    id: 5,
    category: '구원',
    verse: '요한복음 5:24',
    text: '내 말을 듣고 또 나 보내신 이를 믿는 자는 영생을 얻었고 심판에 이르지 아니하나니 사망에서 생명으로 옮겼느니라.',
  },

  // 신뢰에 대한 구절
  {
    id: 6,
    category: '신뢰',
    verse: '잠언 3:5-6',
    text: '너는 마음을 다하여 여호와를 신뢰하고 네 명철을 의지하지 말라. 너는 범사에 그를 인정하라. 그리하면 네 길을 지도하시리라.',
  },
  {
    id: 7,
    category: '신뢰',
    verse: '이사야 26:3',
    text: '주께서 심지가 견고한 자를 평강에 평강으로 지키시리니 이는 그가 주를 신뢰함이니이다.',
  },
  {
    id: 8,
    category: '신뢰',
    verse: '베드로전서 5:7',
    text: '너희 염려를 다 주께 맡기라 이는 그가 너희를 돌보심이라.',
  },
  {
    id: 9,
    category: '신뢰',
    verse: '빌립보서 4:6-7',
    text: '아무 것도 염려하지 말고 다만 모든 일에 기도와 간구로 너희 구할 것을 감사함으로 하나님께 아뢰라.',
  },

  // 인내에 대한 구절
  {
    id: 10,
    category: '인내',
    verse: '야고보서 1:2-3',
    text: '내 형제들아 너희가 여러 가지 시험을 만나거든 온전히 기쁘게 여기라 이는 너희 믿음의 시련이 인내를 만들어 내는 줄 너희가 앎이라.',
  },
  {
    id: 11,
    category: '인내',
    verse: '갈라디아서 6:9',
    text: '우리가 선을 행하되 낙심하지 말지니 포기하지 아니하면 때가 이르매 거두리라.',
  },

  // 감사에 대한 구절
  {
    id: 12,
    category: '감사',
    verse: '데살로니가전서 5:18',
    text: '범사에 감사하라 이것이 그리스도 예수 안에서 너희를 향하신 하나님의 뜻이니라.',
  },
  {
    id: 13,
    category: '감사',
    verse: '시편 107:1',
    text: '여호와께 감사하라 그는 선하시며 그 인자하심이 영원함이로다.',
  },

  // 사랑에 대한 구절
  {
    id: 14,
    category: '사랑',
    verse: '고린도전서 13:4-5',
    text: '사랑은 오래 참고 사랑은 온유하며 시기하지 아니하며 자랑하지 아니하며 교만하지 아니하며 무례히 행하지 아니하며 자기의 유익을 구하지 아니하며 성내지 아니하며 악한 것을 생각하지 아니하며.',
  },
  {
    id: 15,
    category: '사랑',
    verse: '요한복음 13:34-35',
    text: '새 계명을 너희에게 주노니 서로 사랑하라 내가 너희를 사랑한 것 같이 너희도 서로 사랑하라.',
  },
  // 추가 구절 (16~100) 여기에 계속 추가됨
  {
    id: 16,
    category: '구원',
    verse: '에베소서 2:8-9',
    text: '너희는 그 은혜에 의하여 믿음으로 말미암아 구원을 받았으니 이것은 너희에게서 난 것이 아니요 하나님의 선물이라 행위에서 난 것이 아니니 이는 누구든지 자랑하지 못하게 함이라.',
  },
  {
    id: 17,
    category: '구원',
    verse: '디도서 3:5',
    text: '우리를 구원하시되 우리가 행한 바 의로운 행위로 말미암지 아니하고 오직 그의 긍휼하심을 따라 중생의 씻음과 성령의 새롭게 하심으로 하셨나니.',
  },
  {
    id: 18,
    category: '신뢰',
    verse: '시편 56:3',
    text: '내가 두려워하는 날에는 내가 주를 의지하리이다.',
  },
  {
    id: 19,
    category: '신뢰',
    verse: '이사야 12:2',
    text: '보라 하나님은 나의 구원이시라 내가 신뢰하고 두려움이 없으리니 주 여호와는 나의 힘이시며 나의 노래시며 나의 구원이심이라.',
  },
  {
    id: 20,
    category: '사랑',
    verse: '요한일서 4:19',
    text: '우리가 사랑함은 그가 먼저 우리를 사랑하셨음이라.',
  },
  {
    id: 21,
    category: '신뢰',
    verse: '시편 46:1',
    text: '하나님은 우리의 피난처시요 힘이시니 환난 중에 만날 큰 도움이시라.',
  },
  {
    id: 22,
    category: '감사',
    verse: '골로새서 3:17',
    text: '또 무엇을 하든지 말에나 일에나 다 주 예수의 이름으로 하고 그를 힘입어 하나님 아버지께 감사하라.',
  },
  {
    id: 23,
    category: '인내',
    verse: '로마서 12:12',
    text: '소망 중에 즐거워하며 환난 중에 참으며 기도에 항상 힘쓰며.',
  },
  {
    id: 24,
    category: '사랑',
    verse: '요한일서 4:7',
    text: '사랑하는 자들아 우리가 서로 사랑하자 사랑은 하나님께 속한 것이니 사랑하는 자마다 하나님으로부터 나서 하나님을 알고.',
  },
  {
    id: 25,
    category: '구원',
    verse: '로마서 10:9',
    text: '네가 만일 네 입으로 예수를 주로 시인하며 또 하나님께서 그를 죽은 자 가운데서 살리신 것을 네 마음에 믿으면 구원을 받으리라.',
  },
  {
    id: 26,
    category: '감사',
    verse: '시편 118:24',
    text: '이 날은 여호와께서 정하신 것이라 이 날에 우리가 즐거워하고 기뻐하리로다.',
  },
  {
    id: 27,
    category: '신뢰',
    verse: '예레미야 17:7',
    text: '그러나 무릇 여호와를 의지하며 여호와를 의뢰하는 그 사람은 복을 받을 것이라.',
  },
  {
    id: 28,
    category: '인내',
    verse: '히브리서 12:1',
    text: '인내로써 우리 앞에 당한 경주를 경주하며.',
  },
  {
    id: 29,
    category: '사랑',
    verse: '로마서 5:8',
    text: '우리가 아직 죄인 되었을 때에 그리스도께서 우리를 위하여 죽으심으로 하나님께서 우리에 대한 자기의 사랑을 확증하셨느니라.',
  },
  {
    id: 30,
    category: '구원',
    verse: '사도행전 4:12',
    text: '다른 이로서는 구원을 받을 수 없나니 천하 사람 중에 구원을 받을 만한 다른 이름을 우리에게 주신 일이 없음이라 하였더라.',
  },
  {
    id: 31,
    category: '신뢰',
    verse: '시편 37:5',
    text: '네 길을 여호와께 맡기라 그를 의지하면 그가 이루시고.',
  },
  {
    id: 32,
    category: '감사',
    verse: '에베소서 5:20',
    text: '범사에 우리 주 예수 그리스도의 이름으로 항상 아버지 하나님께 감사하며.',
  },
  {
    id: 33,
    category: '인내',
    verse: '베드로전서 1:6-7',
    text: '너희가 지금 여러 가지 시험으로 말미암아 잠깐 근심하게 되지 않을 수 없으나 너희 믿음의 시련은 불로 연단하여도 없어질 금보다 더 귀하여 예수 그리스도께서 나타나실 때에 칭찬과 영광과 존귀를 얻게 하려 함이라.',
  },
  {
    id: 34,
    category: '사랑',
    verse: '마태복음 22:37-39',
    text: '네 마음을 다하고 목숨을 다하고 뜻을 다하여 주 너의 하나님을 사랑하라 하셨으니 이것이 크고 첫째 되는 계명이요 둘째도 그와 같으니 네 이웃을 네 자신 같이 사랑하라.',
  },
  {
    id: 35,
    category: '구원',
    verse: '디모데전서 2:5-6',
    text: '하나님은 한 분이시요 하나님과 사람 사이의 중보자도 한 분이시니 곧 사람이신 그리스도 예수라 그가 모든 사람을 위하여 자기를 대속물로 주셨으니.',
  },
  {
    id: 36,
    category: '신뢰',
    verse: '시편 91:2',
    text: '나는 여호와를 향하여 말하기를 그는 나의 피난처요 나의 요새요 내가 의뢰하는 하나님이라 하리니.',
  },
  {
    id: 37,
    category: '감사',
    verse: '시편 30:11-12',
    text: '주께서 나의 슬픔을 변하여 춤이 되게 하시며 나의 굵은 베를 벗기고 기쁨으로 띠 띠우셨나이다. 이는 잠잠하지 아니하고 내 영광으로 주를 찬송하게 하심이니 여호와 나의 하나님이여 내가 주께 영원히 감사하리이다.',
  },
  {
    id: 38,
    category: '인내',
    verse: '로마서 5:3-4',
    text: '다만 이뿐 아니라 우리가 환난 중에도 즐거워하나니 이는 환난은 인내를, 인내는 연단을, 연단은 소망을 이루는 줄 앎이로다.',
  },
  {
    id: 39,
    category: '사랑',
    verse: '에베소서 5:2',
    text: '그리스도께서 너희를 사랑하신 것 같이 너희도 사랑 가운데서 행하라 그는 우리를 위하여 자신을 버리사 향기로운 제물과 희생제물로 하나님께 드리셨느니라.',
  },
  {
    id: 40,
    category: '구원',
    verse: '베드로후서 3:9',
    text: '주의 약속은 어떤 이들이 더디다고 생각하는 것 같이 더딘 것이 아니라 오직 너희를 대하여 오래 참으사 아무도 멸망하지 아니하고 다 회개하기에 이르기를 원하시느니라.',
  },
  {
    id: 41,
    category: '신뢰',
    verse: '시편 121:1-2',
    text: '내가 산을 향하여 눈을 들리라 나의 도움이 어디서 올까 나의 도움은 천지를 지으신 여호와에게서로다.',
  },
  {
    id: 42,
    category: '감사',
    verse: '시편 103:2',
    text: '내 영혼아 여호와를 송축하며 그의 모든 은택을 잊지 말지어다.',
  },
  {
    id: 43,
    category: '사랑',
    verse: '고린도전서 16:14',
    text: '너희 모든 일을 사랑으로 행하라.',
  },
  {
    id: 44,
    category: '인내',
    verse: '시편 27:14',
    text: '너는 여호와를 기다릴지어다 강하고 담대하며 여호와를 기다릴지어다.',
  },
  {
    id: 45,
    category: '구원',
    verse: '이사야 53:5',
    text: '그가 찔림은 우리의 허물 때문이요 그가 상함은 우리의 죄악 때문이라 그가 징계를 받음으로 우리는 평화를 누리고 그가 채찍에 맞음으로 우리는 나음을 받았도다.',
  },
  {
    id: 46,
    category: '신뢰',
    verse: '시편 20:7',
    text: '어떤 사람은 병거, 어떤 사람은 말을 의지하나 우리는 여호와 우리 하나님의 이름을 자랑하리로다.',
  },
  {
    id: 47,
    category: '감사',
    verse: '시편 136:1',
    text: '여호와께 감사하라 그는 선하시며 그 인자하심이 영원함이로다.',
  },
  {
    id: 48,
    category: '인내',
    verse: '전도서 7:8',
    text: '일의 끝이 시작보다 낫고 참는 마음이 교만한 마음보다 나으니라.',
  },
  {
    id: 49,
    category: '사랑',
    verse: '요한일서 4:8',
    text: '사랑하지 아니하는 자는 하나님을 알지 못하나니 이는 하나님은 사랑이심이라.',
  },
  {
    id: 50,
    category: '구원',
    verse: '요한복음 14:6',
    text: '예수께서 이르시되 내가 곧 길이요 진리요 생명이니 나로 말미암지 않고는 아버지께로 올 자가 없느니라.',
  },
  {
    id: 51,
    category: '신뢰',
    verse: '시편 34:4',
    text: '내가 여호와께 간구하매 내게 응답하시고 내 모든 두려움에서 나를 건지셨도다.',
  },
  {
    id: 52,
    category: '감사',
    verse: '시편 100:4',
    text: '감사함으로 그의 문에 들어가며 찬송함으로 그의 궁정에 들어가서 그에게 감사하며 그의 이름을 송축할지어다.',
  },
  {
    id: 53,
    category: '사랑',
    verse: '요한복음 15:13',
    text: '사람이 친구를 위하여 자기 목숨을 버리면 이에서 더 큰 사랑이 없나니.',
  },
  {
    id: 54,
    category: '인내',
    verse: '야고보서 5:11',
    text: '보라 인내하는 자를 우리가 복되다 하나니 너희가 욥의 인내를 들었고 주께서 주신 결말을 보았거니와 주는 가장 자비하시고 긍휼히 여기시는 이시니라.',
  },
  {
    id: 55,
    category: '구원',
    verse: '요한복음 1:12',
    text: '영접하는 자 곧 그 이름을 믿는 자들에게는 하나님의 자녀가 되는 권세를 주셨으니.',
  },
  {
    id: 56,
    category: '신뢰',
    verse: '잠언 16:3',
    text: '너의 행사를 여호와께 맡기라 그리하면 네가 경영하는 것이 이루어지리라.',
  },
  {
    id: 57,
    category: '감사',
    verse: '시편 92:1',
    text: '지존하신 자여 주께 감사하며 주의 이름을 찬양하는 것이 좋으니이다.',
  },
  {
    id: 58,
    category: '사랑',
    verse: '로마서 13:10',
    text: '사랑은 이웃에게 악을 행하지 아니하나니 그러므로 사랑은 율법의 완성이니라.',
  },
  {
    id: 59,
    category: '인내',
    verse: '히브리서 6:15',
    text: '그가 이같이 오래 참아 약속을 받았느니라.',
  },
  {
    id: 60,
    category: '구원',
    verse: '요한복음 6:47',
    text: '진실로 진실로 너희에게 이르노니 믿는 자는 영생을 가졌나니.',
  },
  {
    id: 61,
    category: '신뢰',
    verse: '시편 28:7',
    text: '여호와는 나의 힘과 나의 방패시니 내 마음이 그를 의지하여 도움을 얻었도다.',
  },
  {
    id: 62,
    category: '감사',
    verse: '시편 9:1',
    text: '내가 전심으로 여호와께 감사하오며 주의 모든 기이한 일들을 전하리이다.',
  },
  {
    id: 63,
    category: '사랑',
    verse: '요한일서 3:18',
    text: '자녀들아 우리가 말과 혀로만 사랑하지 말고 행함과 진실함으로 하자.',
  },
  {
    id: 64,
    category: '인내',
    verse: '시편 40:1',
    text: '내가 여호와를 기다리고 기다렸더니 귀를 기울이사 나의 부르짖음을 들으셨도다.',
  },
  {
    id: 65,
    category: '구원',
    verse: '요한복음 11:25-26',
    text: '예수께서 이르시되 나는 부활이요 생명이니 나를 믿는 자는 죽어도 살겠고 무릇 살아서 나를 믿는 자는 영원히 죽지 아니하리니 이것을 네가 믿느냐.',
  },
  {
    id: 66,
    category: '신뢰',
    verse: '이사야 40:31',
    text: '오직 여호와를 앙망하는 자는 새 힘을 얻으리니 독수리가 날개치며 올라감 같을 것이요 달려가도 곤비하지 아니하고 걸어가도 피곤하지 아니하리로다.',
  },
  {
    id: 67,
    category: '감사',
    verse: '시편 34:1',
    text: '내가 여호와를 항상 송축함이여 내 입술로 항상 주를 찬양하리이다.',
  },
  {
    id: 68,
    category: '사랑',
    verse: '골로새서 3:14',
    text: '이 모든 것 위에 사랑을 더하라 이는 온전하게 매는 띠니라.',
  },
  {
    id: 69,
    category: '인내',
    verse: '로마서 8:25',
    text: '우리가 보지 못하는 것을 바라면 참음으로 기다릴지니라.',
  },
  {
    id: 70,
    category: '구원',
    verse: '요엘 2:32',
    text: '누구든지 여호와의 이름을 부르는 자는 구원을 얻으리니.',
  },
  {
    id: 71,
    category: '신뢰',
    verse: '시편 62:8',
    text: '백성들아 시시로 그를 의지하고 그의 앞에 마음을 토하라 하나님은 우리의 피난처시로다 셀라.',
  },
  {
    id: 72,
    category: '감사',
    verse: '시편 138:1',
    text: '내가 전심으로 주께 감사하며 신들 앞에서 주께 찬양하리이다.',
  },
  {
    id: 73,
    category: '사랑',
    verse: '베드로전서 4:8',
    text: '무엇보다도 열심히 서로 사랑할지니 사랑은 허다한 죄를 덮느니라.',
  },
  {
    id: 74,
    category: '인내',
    verse: '히브리서 10:36',
    text: '너희에게 인내가 필요함은 하나님의 뜻을 행한 후에 약속하신 것을 받기 위함이라.',
  },
  {
    id: 75,
    category: '구원',
    verse: '요한계시록 3:20',
    text: '볼지어다 내가 문 밖에 서서 두드리노니 누구든지 내 음성을 듣고 문을 열면 내가 그에게로 들어가 그와 더불어 먹고 그는 나와 더불어 먹으리라.',
  },
  {
    id: 76,
    category: '신뢰',
    verse: '시편 18:2',
    text: '여호와는 나의 반석이시요 나의 요새시요 나를 건지시는 이시요 나의 하나님이시요 내가 그 안에 피할 나의 바위시요 나의 방패시요 나의 구원의 뿔이시요 나의 산성이시로다.',
  },
  {
    id: 77,
    category: '감사',
    verse: '시편 30:4',
    text: '주의 성도들아 여호와를 찬송하며 그의 거룩함을 기억하며 감사하라.',
  },
  {
    id: 78,
    category: '사랑',
    verse: '요한복음 17:26',
    text: '내가 아버지의 이름을 그들에게 알게 하였고 또 알게 하리니 이는 아버지께서 나를 사랑하신 그 사랑이 그들 안에 있고 나도 그들 안에 있게 하려 함이니이다.',
  },
  {
    id: 79,
    category: '인내',
    verse: '누가복음 21:19',
    text: '너희의 인내로 너희 영혼을 얻으리라.',
  },
  {
    id: 80,
    category: '구원',
    verse: '이사야 12:2',
    text: '보라 하나님은 나의 구원이시라 내가 신뢰하고 두려움이 없으리니 주 여호와는 나의 힘이시며 나의 노래시며 나의 구원이심이라.',
  },
  {
    id: 81,
    category: '신뢰',
    verse: '시편 125:1',
    text: '여호와를 의지하는 자는 시온 산과 같아서 흔들리지 아니하고 영원히 있음이로다.',
  },
  {
    id: 82,
    category: '감사',
    verse: '시편 107:8-9',
    text: '사람들이 여호와의 인자하심과 인생에게 행하신 기적으로 말미암아 그를 찬송할지로다. 그가 사모하는 영혼에게 만족을 주시며 주린 영혼에게 좋은 것으로 채워주시미로다.',
  },
  {
    id: 83,
    category: '사랑',
    verse: '요한일서 4:10',
    text: '사랑은 여기 있으니 우리가 하나님을 사랑한 것이 아니요 하나님이 우리를 사랑하사 우리 죄를 위하여 화목제물로 그 아들을 보내셨음이라.',
  },
  {
    id: 84,
    category: '인내',
    verse: '로마서 15:4',
    text: '무엇이든지 전에 기록된 바는 우리의 교훈을 위하여 기록된 것이니 우리로 하여금 인내로 또는 성경의 위로로 소망을 가지게 함이니라.',
  },
  {
    id: 85,
    category: '구원',
    verse: '로마서 8:1',
    text: '그러므로 이제 그리스도 예수 안에 있는 자에게는 결코 정죄함이 없나니.',
  },
  {
    id: 86,
    category: '신뢰',
    verse: '시편 23:1',
    text: '여호와는 나의 목자시니 내게 부족함이 없으리로다.',
  },
  {
    id: 87,
    category: '감사',
    verse: '시편 75:1',
    text: '하나님이여 우리가 주께 감사하고 감사함은 주의 이름이 가까움이라 사람들이 주의 기이한 일들을 전파하나이다.',
  },
  {
    id: 88,
    category: '사랑',
    verse: '고린도후서 5:14-15',
    text: '그리스도의 사랑이 우리를 강권하시는도다 우리가 생각하건대 한 사람이 모든 사람을 대신하여 죽었은즉 모든 사람이 죽은 것이라.',
  },
  {
    id: 89,
    category: '인내',
    verse: '요한계시록 2:10',
    text: '네가 장차 받을 고난을 두려워하지 말라... 죽도록 충성하라 그리하면 내가 생명의 면류관을 네게 주리라.',
  },
  {
    id: 90,
    category: '구원',
    verse: '디도서 2:11',
    text: '모든 사람에게 구원을 주시는 하나님의 은혜가 나타나.',
  },
  {
    id: 91,
    category: '신뢰',
    verse: '시편 84:11',
    text: '여호와 하나님은 해요 방패이시라 여호와께서 은혜와 영광을 주시며 정직하게 행하는 자에게 좋은 것을 아끼지 아니하실 것임이니이다.',
  },
  {
    id: 92,
    category: '감사',
    verse: '시편 147:7',
    text: '감사함으로 여호와께 노래하며 수금으로 하나님께 찬양할지어다.',
  },
  {
    id: 93,
    category: '사랑',
    verse: '요한복음 13:1',
    text: '세상에 있는 자기 사람들을 사랑하시되 끝까지 사랑하시니라.',
  },
  {
    id: 94,
    category: '인내',
    verse: '로마서 2:7',
    text: '선을 행하여 영광과 존귀와 썩지 아니함을 구하는 자에게는 영생으로 하시고.',
  },
  {
    id: 95,
    category: '구원',
    verse: '베드로전서 1:9',
    text: '믿음의 결국 곧 영혼의 구원을 받음이라.',
  },
  {
    id: 96,
    category: '신뢰',
    verse: '시편 31:24',
    text: '너희 모든 소망을 여호와께 두는 자들아 강하고 담대하라.',
  },
  {
    id: 97,
    category: '감사',
    verse: '히브리서 12:28',
    text: '그러므로 우리가 흔들리지 않는 나라를 받았은즉 은혜를 받자 이로 말미암아 경건함과 두려움으로 하나님을 기쁘시게 섬길지니.',
  },
  {
    id: 98,
    category: '사랑',
    verse: '고린도전서 13:13',
    text: '그런즉 믿음, 소망, 사랑 이 세 가지는 항상 있을 것인데 그 중의 제일은 사랑이라.',
  },
  {
    id: 99,
    category: '인내',
    verse: '시편 37:7',
    text: '여호와 앞에 잠잠하고 참고 기다리라.',
  },
  {
    id: 100,
    category: '구원',
    verse: '이사야 45:22',
    text: '땅의 모든 끝이여 내게로 돌이켜 구원을 받으라 나는 하나님이라 다른 이가 없느니라.',
  },
  // 100개 완료
]

export default function BibleFlashcardApp() {
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)
  // --- FIX: Explicitly type the state ---
  const [known, setKnown] = useState<number[]>([])
  // --- End of FIX ---
  const [filter, setFilter] = useState('전체')
  const [completeMessage, setCompleteMessage] = useState('')

  const filteredVerses =
    filter === '전체'
      ? bibleVerses
      : bibleVerses.filter((v) => v.category === filter)

  const handleFlip = () => setFlipped(!flipped)

  const handleKnown = () => {
    if (!known.includes(current)) {
      const newKnown = [...known, current]
      setKnown(newKnown)

      // 현재 카테고리 완료 확인
      if (filter !== '전체') {
        const allInCategory = filteredVerses.map((_, i) => i)
        const knownInCategory = newKnown.filter((k) =>
          allInCategory.includes(k),
        )

        if (knownInCategory.length === allInCategory.length) {
          setTimeout(() => {
            confetti({
              particleCount: 150,
              spread: 70,
              origin: { y: 0.6 },
            })
            setCompleteMessage(`"${filter}"의 길이 열립니다! 축하합니다 🎉`)
          }, 100)
        }
      }
    }
    setFlipped(false)
    setCurrent((prev) => (prev + 1) % filteredVerses.length)
  }

  const handleNext = () => {
    setFlipped(false)
    setCurrent((prev) => (prev + 1) % filteredVerses.length)
  }

  const progress = (known.length / filteredVerses.length) * 100

  return (
    <div className="flex flex-col items-center p-8 space-y-6 bg-beige min-h-screen">
      <h1 className="text-3xl font-bold">성경 암송 플래시카드</h1>
      <div className=" top-4 right-6 text-lg font-bold text-gray-600">
        {new Date().toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}
      </div>
      <div className="flex space-x-2">
        {['전체', '구원', '신뢰', '인내', '감사', '사랑'].map((cat) => (
          <Button
            key={cat}
            onClick={() => {
              setFilter(cat)
              setCurrent(0)
              setCompleteMessage('')

              const filteredIndexes = bibleVerses
                .map((v, i) => ({ ...v, index: i }))
                .filter((v) => cat === '전체' || v.category === cat)
                .map((v) => v.index)
              setKnown((prevKnown) =>
                prevKnown.filter((i) => filteredIndexes.includes(i)),
              )
            }}
            className={`${
              filter === cat ? 'bg-orange-600 text-white' : 'bg-blue-300'
            }`}>
            {cat}
          </Button>
        ))}
      </div>
      <Progress value={progress} className="w-1/2" />
      {completeMessage && (
        <h3 className="text-lg font-semibold text-orange-600 animate-pulse">
          {completeMessage}
        </h3>
      )}
      <motion.div
        className="w-[400px] h-[280px] cursor-pointer relative"
        onClick={handleFlip}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ perspective: 1000 }}>
        <Card
          className="w-full h-full flex items-center justify-center text-center rounded-2xl shadow-xl"
          style={{
            backgroundColor: 'azure',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}>
          <CardContent>
            <p
              className="text-xl px-2"
              style={{ transform: flipped ? 'rotateY(180deg)' : 'none' }}>
              {filteredVerses.length > 0
                ? flipped
                  ? filteredVerses[current].text
                  : filteredVerses[current].verse
                : '구절 없음'}
            </p>
          </CardContent>
        </Card>
      </motion.div>
      <div className="flex space-x-4">
        <Button onClick={handleKnown} className="bg-green-400">
          암기 완료
        </Button>
        <Button onClick={handleNext} className="bg-green-400">
          다음
        </Button>
      </div>
      <p>
        암기한 구절 수: {known.length} / {filteredVerses.length}
      </p>
    </div>
  )
}
