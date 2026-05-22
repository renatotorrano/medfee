import { useState, useMemo } from "react";

const CBHPM_TORACICA = [
  { codigo: "10101012", descricao: "Em consultório (no horário normal ou preestabelecido)", secao: "Consultas (1.01.01.00-4)" },
  { codigo: "10101020", descricao: "Em domicílio", secao: "Consultas (1.01.01.00-4)" },
  { codigo: "10101039", descricao: "Em pronto socorro", secao: "Consultas (1.01.01.00-4)" },
  { codigo: "10102019", descricao: "Visita hospitalar a paciente internado", secao: "Visitas (1.01.02.00-0)" },
  { codigo: "10103015", descricao: "Atendimento ao recém-nascido em berçário", secao: "Recém-Nascido (1.01.03.00-7)" },
  { codigo: "10103031", descricao: "Atendimento ao recém-nascido em sala de parto (parto normal ou operatório de alto risco)", secao: "Recém-Nascido (1.01.03.00-7)" },
  { codigo: "10103023", descricao: "Atendimento ao recém-nascido em sala de parto (parto normal ou operatório de baixo risco)", secao: "Recém-Nascido (1.01.03.00-7)" },
  { codigo: "10104011", descricao: "Atendimento do intensivista diarista (por dia e por paciente)", secao: "Uti (1.01.04.00-3)" },
  { codigo: "10104020", descricao: "Atendimento médico do intensivista em UTI geral ou pediátrica (plantão de 12 horas -", secao: "Uti (1.01.04.00-3)" },
  { codigo: "10105077", descricao: "Acompanhamento médico para transporte intra-hospitalar de pacientes graves,", secao: "Uti (1.01.04.00-3)" },
  { codigo: "10105050", descricao: "Transporte extra-hospitalar aéreo ou aquático de pacientes graves, 1ª hora -", secao: "Uti (1.01.04.00-3)" },
  { codigo: "10105069", descricao: "Transporte extra-hospitalar aéreo ou aquático de pacientes graves, por hora adicional", secao: "Uti (1.01.04.00-3)" },
  { codigo: "10105034", descricao: "Transporte extra-hospitalar terrestre de pacientes graves, 1ª hora - a partir do", secao: "Uti (1.01.04.00-3)" },
  { codigo: "10105042", descricao: "Transporte extra-hospitalar terrestre de pacientes graves, por hora adicional -", secao: "Uti (1.01.04.00-3)" },
  { codigo: "10106014", descricao: "Aconselhamento genético", secao: "Outros (1.01.06.00-6)" },
  { codigo: "10106146", descricao: "Atendimento ambulatorial em puericultura", secao: "Outros (1.01.06.00-6)" },
  { codigo: "10106030", descricao: "Atendimento ao familiar do adolescente", secao: "Outros (1.01.06.00-6)" },
  { codigo: "10106049", descricao: "Atendimento pediátrico a gestantes (3º trimestre)", secao: "Outros (1.01.06.00-6)" },
  { codigo: "10106138", descricao: "Prova de direção veicular em banca especial - Avaliação Clínica durante a prova prática", secao: "Outros (1.01.06.00-6)" },
  { codigo: "20101210", descricao: "Acompanhamento clínico ambulatorial pós-transplante de córnea - por avaliação", secao: "Avaliações / Acompanhamentos (2.01.01.00-7)" },
  { codigo: "20101228", descricao: "Acompanhamento clínico ambulatorial pós-transplante de medula óssea", secao: "Avaliações / Acompanhamentos (2.01.01.00-7)" },
  { codigo: "20101015", descricao: "Acompanhamento clínico ambulatorial pós-transplante renal - por avaliação", secao: "Avaliações / Acompanhamentos (2.01.01.00-7)" },
  { codigo: "20101023", descricao: "Análise da proporcionalidade cineantropométrica", secao: "Avaliações / Acompanhamentos (2.01.01.00-7)" },
  { codigo: "20101201", descricao: "Avaliação clínica e eletrônica de paciente portador de marca-passo ou", secao: "Avaliações / Acompanhamentos (2.01.01.00-7)" },
  { codigo: "20101090", descricao: "Avaliação da composição corporal por antropometria (inclui consulta)", secao: "Avaliações / Acompanhamentos (2.01.01.00-7)" },
  { codigo: "20101104", descricao: "Avaliação da composição corporal por bioimpedanciometria", secao: "Avaliações / Acompanhamentos (2.01.01.00-7)" },
  { codigo: "20101112", descricao: "Avaliação da composição corporal por pesagem hidrostática", secao: "Avaliações / Acompanhamentos (2.01.01.00-7)" },
  { codigo: "20101074", descricao: "Avaliação nutrológica (inclui consulta)", secao: "Avaliações / Acompanhamentos (2.01.01.00-7)" },
  { codigo: "20101082", descricao: "Avaliação nutrológica pré e pós-cirurgia bariátrica (inclui consulta)", secao: "Avaliações / Acompanhamentos (2.01.01.00-7)" },
  { codigo: "20101120", descricao: "Controle anti-doping (por período de 2 horas) - durante competições", secao: "Avaliações / Acompanhamentos (2.01.01.00-7)" },
  { codigo: "20101139", descricao: "Controle anti-doping (por período de 2 horas) - fora de competições", secao: "Avaliações / Acompanhamentos (2.01.01.00-7)" },
  { codigo: "20101155", descricao: "Prestação de serviços em delegações ou competições esportivas", secao: "Avaliações / Acompanhamentos (2.01.01.00-7)" },
  { codigo: "20101171", descricao: "Rejeição de enxerto renal - tratamento ambulatorial - avaliação clínica diária", secao: "Avaliações / Acompanhamentos (2.01.01.00-7)" },
  { codigo: "20102011", descricao: "Holter de 24 horas - 2 ou mais canais - analógico", secao: "Monitorizações (2.01.02.00-3)" },
  { codigo: "20102020", descricao: "Holter de 24 horas - 3 canais - digital", secao: "Monitorizações (2.01.02.00-3)" },
  { codigo: "20102062", descricao: "Monitor de eventos sintomáticos por 15 a 30 dias (LOOPER)", secao: "Monitorizações (2.01.02.00-3)" },
  { codigo: "20102038", descricao: "Monitorização ambulatorial da pressão arterial - MAPA (24 horas)", secao: "Monitorizações (2.01.02.00-3)" },
  { codigo: "20102070", descricao: "Tilt teste", secao: "Monitorizações (2.01.02.00-3)" },
  { codigo: "20103018", descricao: "Adaptação e treinamento de recursos ópticos para visão subnormal", secao: "Reabilitações - Sessões (2.01.03.00-0)" },
  { codigo: "20103026", descricao: "Amputação bilateral (preparação do coto)", secao: "Reabilitações - Sessões (2.01.03.00-0)" },
  { codigo: "20103034", descricao: "Amputação bilateral (treinamento protético)", secao: "Reabilitações - Sessões (2.01.03.00-0)" },
  { codigo: "20103042", descricao: "Amputação unilateral (preparação do coto)", secao: "Reabilitações - Sessões (2.01.03.00-0)" },
  { codigo: "20103050", descricao: "Amputação unilateral (treinamento protético)", secao: "Reabilitações - Sessões (2.01.03.00-0)" },
  { codigo: "20103077", descricao: "Ataxias", secao: "Reabilitações - Sessões (2.01.03.00-0)" },
  { codigo: "20103123", descricao: "Atividades em escola de postura (máximo de 10 pessoas) - por sessão", secao: "Procedimentos Clínicos" },
  { codigo: "20103131", descricao: "Biofeedback com EMG", secao: "Procedimentos Clínicos" },
  { codigo: "20103140", descricao: "Bloqueio fenólico, alcoólico ou com toxina botulínica por segmento corporal", secao: "Procedimentos Clínicos" },
  { codigo: "20103158", descricao: "Confecção de órteses em material termo-sensível (por unidade)", secao: "Procedimentos Clínicos" },
  { codigo: "20103166", descricao: "Confecção de prótese imediata", secao: "Procedimentos Clínicos" },
  { codigo: "20103174", descricao: "Confecção de prótese provisória", secao: "Procedimentos Clínicos" },
  { codigo: "20103182", descricao: "Desvios posturais da coluna vertebral", secao: "Procedimentos Clínicos" },
  { codigo: "20103190", descricao: "Disfunção vésico-uretral", secao: "Procedimentos Clínicos" },
  { codigo: "20103212", descricao: "Distúrbios circulatórios artério-venosos e linfáticos", secao: "Procedimentos Clínicos" },
  { codigo: "20103220", descricao: "Doenças pulmonares atendidas em ambulatório", secao: "Procedimentos Clínicos" },
  { codigo: "20103239", descricao: "Exercícios de ortóptica (por sessão)", secao: "Procedimentos Clínicos" },
  { codigo: "20103247", descricao: "Exercícios para reabilitação do asmático (ERAC) - por sessão coletiva", secao: "Procedimentos Clínicos" },
  { codigo: "20103255", descricao: "Exercícios para reabilitação do asmático (ERAI) - por sessão individual", secao: "Procedimentos Clínicos" },
  { codigo: "20103263", descricao: "Hemiparesia", secao: "Procedimentos Clínicos" },
  { codigo: "20103271", descricao: "Hemiplegia", secao: "Procedimentos Clínicos" },
  { codigo: "20103280", descricao: "Hemiplegia e hemiparesia com afasia", secao: "Procedimentos Clínicos" },
  { codigo: "20103298", descricao: "Hipo ou agenesia de membros", secao: "Procedimentos Clínicos" },
  { codigo: "20103310", descricao: "Lesão nervosa periférica afetando mais de um nervo com alterações sensitivas", secao: "Procedimentos Clínicos" },
  { codigo: "20103328", descricao: "Lesão nervosa periférica afetando um nervo com alterações sensitivas e/ou motoras", secao: "Procedimentos Clínicos" },
  { codigo: "20103336", descricao: "Manipulação vertebral", secao: "Procedimentos Clínicos" },
  { codigo: "20103344", descricao: "Miopatias", secao: "Procedimentos Clínicos" },
  { codigo: "20103360", descricao: "Paciente com D.P.O.C. em atendimento ambulatorial necessitando reeducação", secao: "Procedimentos Clínicos" },
  { codigo: "20103379", descricao: "Paciente em pós-operatório de cirurgia cardíaca, atendido em ambulatório, duas", secao: "Procedimentos Clínicos" },
  { codigo: "20103387", descricao: "Pacientes com doença isquêmica do coração, atendido em ambulatório de", secao: "Procedimentos Clínicos" },
  { codigo: "20103395", descricao: "Pacientes com doença isquêmica do coração, atendido em ambulatório, até", secao: "Procedimentos Clínicos" },
  { codigo: "20103409", descricao: "Pacientes com doenças neuro-músculo-esqueléticas com envolvimento tegumentar", secao: "Procedimentos Clínicos" },
  { codigo: "20103417", descricao: "Pacientes sem doença coronariana clinicamente manifesta, mas considerada", secao: "Procedimentos Clínicos" },
  { codigo: "20103425", descricao: "Paralisia cerebral", secao: "Procedimentos Clínicos" },
  { codigo: "20103433", descricao: "Paralisia cerebral com distúrbio de comunicação", secao: "Procedimentos Clínicos" },
  { codigo: "20103441", descricao: "Paraparesia/tetraparesia", secao: "Procedimentos Clínicos" },
  { codigo: "20103450", descricao: "Paraplegia e tetraplegia", secao: "Procedimentos Clínicos" },
  { codigo: "20103468", descricao: "Parkinson", secao: "Procedimentos Clínicos" },
  { codigo: "20103476", descricao: "Patologia neurológica com dependência de atividades da vida diária", secao: "Procedimentos Clínicos" },
  { codigo: "20103514", descricao: "Patologia osteomioarticular em diferentes segmentos da coluna", secao: "Procedimentos Clínicos" },
  { codigo: "20103492", descricao: "Patologia osteomioarticular em dois ou mais membros", secao: "Procedimentos Clínicos" },
  { codigo: "20103484", descricao: "Patologia osteomioarticular em um membro", secao: "Procedimentos Clínicos" },
  { codigo: "20103506", descricao: "Patologia osteomioarticular em um segmento da coluna", secao: "Procedimentos Clínicos" },
  { codigo: "20103522", descricao: "Patologias osteomioarticulares com dependência de atividades da vida diária", secao: "Procedimentos Clínicos" },
  { codigo: "20103549", descricao: "Procedimentos mesoterápicos (por região anatômica)", secao: "Procedimentos Clínicos" },
  { codigo: "20103557", descricao: "Procedimentos mesoterápicos com calcitonina (qualquer segmento)", secao: "Procedimentos Clínicos" },
  { codigo: "20103581", descricao: "Programa de exercício supervisionado com obtenção de eletrocardiograma e/ou", secao: "Procedimentos Clínicos" },
  { codigo: "20103573", descricao: "Programa de exercício supervisionado com obtenção de eletrocardiograma e/ou", secao: "Procedimentos Clínicos" },
  { codigo: "20103603", descricao: "Programa de exercício supervisionado sem obtenção de eletrocardiograma e/ou", secao: "Procedimentos Clínicos" },
  { codigo: "20103590", descricao: "Programa de exercício supervisionado sem obtenção de eletrocardiograma e/ou", secao: "Procedimentos Clínicos" },
  { codigo: "20103611", descricao: "Queimados - seguimento ambulatorial para prevenção de sequelas (por segmento)", secao: "Procedimentos Clínicos" },
  { codigo: "20103727", descricao: "Reabilitação cardíaca supervisionada. Programa de 12 semanas. Duas a três", secao: "Procedimentos Clínicos" },
  { codigo: "20103620", descricao: "Reabilitação de paciente com endoprótese", secao: "Procedimentos Clínicos" },
  { codigo: "20103638", descricao: "Reabilitação labiríntica (por sessão)", secao: "Procedimentos Clínicos" },
  { codigo: "20103646", descricao: "Reabilitação perineal com biofeedback", secao: "Procedimentos Clínicos" },
  { codigo: "20103654", descricao: "Recuperação funcional de distúrbios crânio-faciais", secao: "Procedimentos Clínicos" },
  { codigo: "20103530", descricao: "Recuperação funcional pós-operatória ou por imobilização da patologia vertebral", secao: "Procedimentos Clínicos" },
  { codigo: "20103670", descricao: "Recuperação funcional pós-operatória ou pós-imobilização gessada de patologia", secao: "Procedimentos Clínicos" },
  { codigo: "20103662", descricao: "Recuperação funcional pós-operatória ou pós-imobilização gessada de patologia", secao: "Procedimentos Clínicos" },
  { codigo: "20103689", descricao: "Retardo do desenvolvimento psicomotor", secao: "Procedimentos Clínicos" },
  { codigo: "20103697", descricao: "Sequelas de traumatismos torácicos e abdominais", secao: "Procedimentos Clínicos" },
  { codigo: "20103700", descricao: "Sequelas em politraumatizados (em diferentes segmentos)", secao: "Procedimentos Clínicos" },
  { codigo: "20103719", descricao: "Sinusites", secao: "Procedimentos Clínicos" },
  { codigo: "20104014", descricao: "Actinoterapia (por sessão)", secao: "Terapêutica (2.01.04.00-6)" },
  { codigo: "20104022", descricao: "Aplicação de hipossensibilizante - em consultório (AHC) exclusive o alérgeno -", secao: "Terapêutica (2.01.04.00-6)" },
  { codigo: "20104049", descricao: "Cateterismo vesical em retenção urinária", secao: "Terapêutica (2.01.04.00-6)" },
  { codigo: "20104065", descricao: "Cerumen - remoção (bilateral)", secao: "Terapêutica (2.01.04.00-6)" },
  { codigo: "20104073", descricao: "Crioterapia (grupo de até 5 lesões)", secao: "Terapêutica (2.01.04.00-6)" },
  { codigo: "20104090", descricao: "Curativo de extremidades de origem vascular", secao: "Terapêutica (2.01.04.00-6)" },
  { codigo: "20104316", descricao: "Curativo de ouvido (cada)", secao: "Terapêutica (2.01.04.00-6)" },
  { codigo: "20104324", descricao: "Curativo oftalmológico", secao: "Terapêutica (2.01.04.00-6)" },
  { codigo: "20104081", descricao: "Curativos em geral com anestesia, exceto queimados", secao: "Terapêutica (2.01.04.00-6)" },
  { codigo: "20104103", descricao: "Curativos em geral sem anestesia, exceto queimados", secao: "Terapêutica (2.01.04.00-6)" },
  { codigo: "20104111", descricao: "Dilatação uretral (sessão)", secao: "Terapêutica (2.01.04.00-6)" },
  { codigo: "20104120", descricao: "Fototerapia com UVA (PUVA) (por sessão)", secao: "Terapêutica (2.01.04.00-6)" },
  { codigo: "20104154", descricao: "Instilação vesical ou uretral", secao: "Terapêutica (2.01.04.00-6)" },
  { codigo: "20104383", descricao: "Pulsoterapia intravenosa (por sessão)", secao: "Terapêutica (2.01.04.00-6)" },
  { codigo: "20104170", descricao: "Sessão de eletroconvulsoterapia (em sala com oxímetro de pulso, monitor de", secao: "Terapêutica (2.01.04.00-6)" },
  { codigo: "20104189", descricao: "Sessão de oxigenoterapia hiperbárica (por sessão de 2 horas)", secao: "Terapêutica (2.01.04.00-6)" },
  { codigo: "20104197", descricao: "Sessão de psicoterapia de casal", secao: "Terapêutica (2.01.04.00-6)" },
  { codigo: "20104200", descricao: "Sessão de psicoterapia de grupo (por paciente)", secao: "Terapêutica (2.01.04.00-6)" },
  { codigo: "20104219", descricao: "Sessão de psicoterapia individual", secao: "Terapêutica (2.01.04.00-6)" },
  { codigo: "20104227", descricao: "Sessão de psicoterapia infantil", secao: "Terapêutica (2.01.04.00-6)" },
  { codigo: "20104391", descricao: "Terapia imunobiológica intravenosa (por sessão)", secao: "Terapêutica (2.01.04.00-6)" },
  { codigo: "20104235", descricao: "Terapia inalatória - por nebulização", secao: "Terapêutica (2.01.04.00-6)" },
  { codigo: "20104294", descricao: "Terapia oncológica - planejamento e 1º dia de tratamento", secao: "Terapêutica (2.01.04.00-6)" },
  { codigo: "20104308", descricao: "Terapia oncológica - por dia subsequente de tratamento (até o início do próximo ciclo)", secao: "Terapêutica (2.01.04.00-6)" },
  { codigo: "20104243", descricao: "Terapia oncológica com altas doses - planejamento e 1º dia de tratamento", secao: "Terapêutica (2.01.04.00-6)" },
  { codigo: "20104251", descricao: "Terapia oncológica com altas doses - por dia subsequente de tratamento", secao: "Procedimentos Clínicos" },
  { codigo: "20104260", descricao: "Terapia oncológica com aplicação de medicamentos por via intracavitária ou", secao: "Procedimentos Clínicos" },
  { codigo: "20104278", descricao: "Terapia oncológica com aplicação intra-arterial ou intravenosa de medicamentos", secao: "Procedimentos Clínicos" },
  { codigo: "20104286", descricao: "Terapia oncológica com aplicação intra-arterial ou intravenosa de medicamentos", secao: "Procedimentos Clínicos" },
  { codigo: "20105010", descricao: "Perícia forense, por psiquiatra forense", secao: "Outros (2.01.05.00-2)" },
  { codigo: "20105029", descricao: "Perícia psiquiátrica administrativa", secao: "Outros (2.01.05.00-2)" },
  { codigo: "20201010", descricao: "Acompanhamento clínico de transplante renal no período de internação do", secao: "Avaliações / Acompanhamentos (2.02.01.00-1)" },
  { codigo: "20201028", descricao: "Acompanhamento peroperatório", secao: "Avaliações / Acompanhamentos (2.02.01.00-1)" },
  { codigo: "20201095", descricao: "Assistência cardiológica no pós-operatório de cirurgia cardíaca (após a alta da UTI)", secao: "Avaliações / Acompanhamentos (2.02.01.00-1)" },
  { codigo: "20201044", descricao: "Assistência cardiológica peroperatória em cirurgia geral e em parto (horas", secao: "Avaliações / Acompanhamentos (2.02.01.00-1)" },
  { codigo: "20201036", descricao: "Assistência cardiológica peroperatória em cirurgia geral e em parto (primeira hora)", secao: "Avaliações / Acompanhamentos (2.02.01.00-1)" },
  { codigo: "20201109", descricao: "Avaliação clínica diária enteral", secao: "Avaliações / Acompanhamentos (2.02.01.00-1)" },
  { codigo: "20201117", descricao: "Avaliação clínica diária parenteral", secao: "Avaliações / Acompanhamentos (2.02.01.00-1)" },
  { codigo: "20201125", descricao: "Avaliação clínica diária parenteral e enteral", secao: "Avaliações / Acompanhamentos (2.02.01.00-1)" },
  { codigo: "20201060", descricao: "Rejeição de enxerto renal - tratamento internado - avaliação clínica diária - por visita", secao: "Avaliações / Acompanhamentos (2.02.01.00-1)" },
  { codigo: "20201079", descricao: "Transplante duplo rim-pâncreas - acompanhamento clínico (pós-operatório até", secao: "Avaliações / Acompanhamentos (2.02.01.00-1)" },
  { codigo: "20201087", descricao: "Tratamento conservador de traumatismo cranioencefálico, hipertensão", secao: "Avaliações / Acompanhamentos (2.02.01.00-1)" },
  { codigo: "20202067", descricao: "Monitorização da pressão intracraniana (por dia)", secao: "Monitorizações (2.02.02.00-8)" },
  { codigo: "20202032", descricao: "Monitorização hemodinâmica invasiva (por 12 horas)", secao: "Monitorizações (2.02.02.00-8)" },
  { codigo: "20202059", descricao: "Potencial evocado intra-operatório - monitorização cirúrgica (PE/IO)", secao: "Monitorizações (2.02.02.00-8)" },
  { codigo: "20203020", descricao: "Eletroestimulação do assoalho pélvico e/ou outra técnica de exercícios", secao: "Procedimentos Clínicos" },
  { codigo: "20203063", descricao: "Pacientes com doença isquêmica do coração, hospitalizado, até 8 semanas", secao: "Procedimentos Clínicos" },
  { codigo: "20203071", descricao: "Pacientes em pós-operatório de cirurgia cardíaca, hospitalizado, até 8 semanas", secao: "Procedimentos Clínicos" },
  { codigo: "20204027", descricao: "Cardioversão elétrica de emergência", secao: "Terapêutica (2.02.04.00-0)" },
  { codigo: "20204035", descricao: "Cardioversão química de arritmia paroxísta em emergência", secao: "Terapêutica (2.02.04.00-0)" },
  { codigo: "20204043", descricao: "Priapismo - tratamento não cirúrgico", secao: "Terapêutica (2.02.04.00-0)" },
  { codigo: "20204159", descricao: "Pulsoterapia intravenosa (por sessão)", secao: "Terapêutica (2.02.04.00-0)" },
  { codigo: "20204167", descricao: "Terapia imunobiológica intravenosa (por sessão)", secao: "Terapêutica (2.02.04.00-0)" },
  { codigo: "20204086", descricao: "Terapia oncológica com aplicação intra-arterial de medicamentos, em regime de", secao: "Terapêutica (2.02.04.00-0)" },
  { codigo: "30101018", descricao: "Abrasão cirúrgica (por sessão)", secao: "Procedimentos (3.01.01.00-0)" },
  { codigo: "30101930", descricao: "Abscesso de unha (drenagem) - tratamento cirúrgico", secao: "Procedimentos (3.01.01.00-0)" },
  { codigo: "30101026", descricao: "Alopecia parcial - exérese e sutura", secao: "Procedimentos (3.01.01.00-0)" },
  { codigo: "30101034", descricao: "Alopecia parcial - rotação de retalho", secao: "Procedimentos (3.01.01.00-0)" },
  { codigo: "30101042", descricao: "Alopecia parcial - rotação múltipla de retalhos", secao: "Procedimentos (3.01.01.00-0)" },
  { codigo: "30101050", descricao: "Apêndice pré-auricular - ressecção", secao: "Procedimentos (3.01.01.00-0)" },
  { codigo: "30101069", descricao: "Autonomização de retalho - por estágio", secao: "Procedimentos (3.01.01.00-0)" },
  { codigo: "30101085", descricao: "Biópsia de unha", secao: "Procedimentos (3.01.01.00-0)" },
  { codigo: "30101093", descricao: "Calosidade e/ou mal perfurante - desbastamento", secao: "Procedimentos (3.01.01.00-0)" },
  { codigo: "30101948", descricao: "Cantoplastia ungueal", secao: "Procedimentos (3.01.01.00-0)" },
  { codigo: "30101107", descricao: "Cauterização química (por grupo de até 5 lesões)", secao: "Procedimentos (3.01.01.00-0)" },
  { codigo: "30101115", descricao: "Cirurgia da hidrosadenite (por região)", secao: "Procedimentos (3.01.01.00-0)" },
  { codigo: "30101140", descricao: "Correção cirúrgica de linfedema (por estágio)", secao: "Procedimentos (3.01.01.00-0)" },
  { codigo: "30101158", descricao: "Correção cirúrgica de sequelas de alopecia traumática", secao: "Procedimentos (3.01.01.00-0)" },
  { codigo: "30101166", descricao: "Correção de deformidades nos membros com utilização", secao: "Procedimentos (3.01.01.00-0)" },
  { codigo: "30101174", descricao: "Correção de deformidades por exérese de tumores,", secao: "Procedimentos (3.01.01.00-0)" },
  { codigo: "30101182", descricao: "Correção de deformidades por exérese de tumores,", secao: "Procedimentos (3.01.01.00-0)" },
  { codigo: "30101204", descricao: "Criocirurgia (nitrogênio líquido) de neoplasias cutâneas", secao: "Procedimentos (3.01.01.00-0)" },
  { codigo: "30101247", descricao: "Curetagem e eletrocoagulação de CA de pele (por lesão)", secao: "Procedimentos (3.01.01.00-0)" },
  { codigo: "30101255", descricao: "Curetagem simples de lesões de pele (por grupo de", secao: "Procedimentos (3.01.01.00-0)" },
  { codigo: "30101263", descricao: "Dermoabrasão de lesões cutâneas", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101271", descricao: "Dermolipectomia para correção de abdome em avental", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101298", descricao: "Eletrocoagulação de lesões de pele e mucosas -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101301", descricao: "Enxerto cartilaginoso", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101310", descricao: "Enxerto composto", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101328", descricao: "Enxerto de mucosa", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101336", descricao: "Enxerto de pele (homoenxerto inclusive)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101352", descricao: "Epilação por eletrólise (por sessão)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101360", descricao: "Escalpo parcial - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101379", descricao: "Escalpo total - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101387", descricao: "Escarectomia descompressiva - (pele e estruturas", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101395", descricao: "Esfoliação química média (por sessão)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101409", descricao: "Esfoliação química profunda (por sessão)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101425", descricao: "Exérese de higroma cístico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101433", descricao: "Exérese de higroma cístico no RN e lactente", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101468", descricao: "Exérese de lesão / tumor de pele e mucosas", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101441", descricao: "Exérese de lesão com auto-enxertia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101476", descricao: "Exérese de tumor e rotação de retalho músculo-cutâneo", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101484", descricao: "Exérese de unha", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101921", descricao: "Exérese e sutura de hemangioma, linfangioma ou nevus", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101450", descricao: "Exérese e sutura de lesões (circulares ou não) com", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101492", descricao: "Exérese e sutura simples de pequenas lesões (por grupo", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101506", descricao: "Exérese tangencial (shaving) - (por grupo de até 5 lesões).. 2C", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101514", descricao: "Expansão tissular (por sessão)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101522", descricao: "Extensos ferimentos, cicatrizes ou tumores - excisão e", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101530", descricao: "Extensos ferimentos, cicatrizes ou tumores - exérese e", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101549", descricao: "Extensos ferimentos, cicatrizes ou tumores - exérese e", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101557", descricao: "Extensos ferimentos, cicatrizes ou tumores - exérese e", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101565", descricao: "Extensos ferimentos, cicatrizes ou tumores - exérese e", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101573", descricao: "Extensos ferimentos, cicatrizes ou tumores - exérese e", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101581", descricao: "Extensos ferimentos, cicatrizes, ou tumores - exérese e", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101590", descricao: "Face - biópsia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101603", descricao: "Ferimentos infectados e mordidas de animais", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101620", descricao: "Incisão e drenagem de abscesso, hematoma ou panarício", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101611", descricao: "Incisão e drenagem de tenossinovites purulentas", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101654", descricao: "Lasercirurgia (por sessão)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101662", descricao: "Matricectomia por dobra ungueal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101670", descricao: "Plástica em Z ou W", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101689", descricao: "Reconstrução com retalhos de gálea aponeurótica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101697", descricao: "Retalho composto (incluindo cartilagem ou osso)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101735", descricao: "Retirada de corpo estranho subcutâneo", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101743", descricao: "Retração cicatricial de axila - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101760", descricao: "Retração cicatricial do cotovelo - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101778", descricao: "Retração de aponevrose palmar (Dupuytren)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101786", descricao: "Sutura de extensos ferimentos com ou sem desbridamento", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101794", descricao: "Sutura de pequenos ferimentos com ou sem", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101808", descricao: "Transecção de retalho", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101816", descricao: "Transferência intermediária de retalho", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101824", descricao: "Tratamento cirúrgico de bridas constrictivas", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101832", descricao: "Tratamento cirúrgico de grandes hemangiomas", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101840", descricao: "Tratamento da miiase furunculóide (por lesão)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101859", descricao: "Tratamento de anomalias pilosas a laser/photoderm -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101867", descricao: "Tratamento de escaras ou ulcerações com enxerto de pele", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101875", descricao: "Tratamento de escaras ou ulcerações com retalhos", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101883", descricao: "Tratamento de escaras ou ulcerações com retalhos", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101891", descricao: "Tratamento de fístula cutânea", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101905", descricao: "Tratamento de lesões cutâneas e vasculares a laser/", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101913", descricao: "TU partes moles - exérese", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30101956", descricao: "Unha (enxerto) - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30201012", descricao: "Biópsia de lábio", secao: "Lábio (3.02.01.00-4)" },
  { codigo: "30201020", descricao: "Excisão com plástica de vermelhão", secao: "Lábio (3.02.01.00-4)" },
  { codigo: "30201039", descricao: "Excisão com reconstrução à custa de retalhos", secao: "Lábio (3.02.01.00-4)" },
  { codigo: "30201047", descricao: "Excisão com reconstrução total", secao: "Lábio (3.02.01.00-4)" },
  { codigo: "30201055", descricao: "Excisão em cunha", secao: "Lábio (3.02.01.00-4)" },
  { codigo: "30201063", descricao: "Frenotomia labial", secao: "Lábio (3.02.01.00-4)" },
  { codigo: "30201080", descricao: "Reconstrução de sulco gengivo-labial", secao: "Lábio (3.02.01.00-4)" },
  { codigo: "30201098", descricao: "Reconstrução total do lábio", secao: "Lábio (3.02.01.00-4)" },
  { codigo: "30201101", descricao: "Tratamento cirúrgico da macrostomia", secao: "Lábio (3.02.01.00-4)" },
  { codigo: "30201110", descricao: "Tratamento cirúrgico da microstomia", secao: "Lábio (3.02.01.00-4)" },
  { codigo: "30202019", descricao: "Alongamento cirúrgico do palato mole", secao: "Boca (3.02.02.00-0)" },
  { codigo: "30202027", descricao: "Biópsia de boca", secao: "Boca (3.02.02.00-0)" },
  { codigo: "30202035", descricao: "Excisão de lesão maligna com reconstrução à custa de", secao: "Boca (3.02.02.00-0)" },
  { codigo: "30202043", descricao: "Excisão de tumor de boca com mandibulectomia", secao: "Boca (3.02.02.00-0)" },
  { codigo: "30202051", descricao: "Exérese de tumor e enxerto cutâneo ou mucoso", secao: "Boca (3.02.02.00-0)" },
  { codigo: "30202060", descricao: "Fístula orofacial - tratamento cirúrgico", secao: "Boca (3.02.02.00-0)" },
  { codigo: "30202078", descricao: "Glossectomia subtotal ou total, com ou sem", secao: "Boca (3.02.02.00-0)" },
  { codigo: "30202094", descricao: "Palatoplastia com enxerto ósseo", secao: "Boca (3.02.02.00-0)" },
  { codigo: "30202108", descricao: "Palatoplastia com retalho faríngeo", secao: "Boca (3.02.02.00-0)" },
  { codigo: "30202116", descricao: "Palatoplastia com retalho miomucoso", secao: "Boca (3.02.02.00-0)" },
  { codigo: "30202124", descricao: "Palatoplastia parcial", secao: "Boca (3.02.02.00-0)" },
  { codigo: "30202132", descricao: "Palatoplastia total", secao: "Boca (3.02.02.00-0)" },
  { codigo: "30202086", descricao: "Palato-queiloplastia unilateral", secao: "Boca (3.02.02.00-0)" },
  { codigo: "30202140", descricao: "Plástica do ducto parotídeo", secao: "Boca (3.02.02.00-0)" },
  { codigo: "30203031", descricao: "Biópsia de língua", secao: "Língua (3.02.03.00-7)" },
  { codigo: "30203015", descricao: "Frenotomia lingual", secao: "Língua (3.02.03.00-7)" },
  { codigo: "30203023", descricao: "Tumor de língua - tratamento cirúrgico", secao: "Língua (3.02.03.00-7)" },
  { codigo: "30204011", descricao: "Biópsia de glândula salivar", secao: "Glândulas Salivares (3.02.04.00-3)" },
  { codigo: "30204020", descricao: "Excisão de glândula submandibular", secao: "Glândulas Salivares (3.02.04.00-3)" },
  { codigo: "30204038", descricao: "Exérese de rânula ou mucocele", secao: "Glândulas Salivares (3.02.04.00-3)" },
  { codigo: "30204046", descricao: "Parotidectomia parcial com conservação do nervo facial", secao: "Glândulas Salivares (3.02.04.00-3)" },
  { codigo: "30204054", descricao: "Parotidectomia total ampliada com ou sem reconstrução", secao: "Glândulas Salivares (3.02.04.00-3)" },
  { codigo: "30204062", descricao: "Parotidectomia total com conservação do nervo facial", secao: "Glândulas Salivares (3.02.04.00-3)" },
  { codigo: "30204070", descricao: "Parotidectomia total com reconstrução do nervo facial", secao: "Glândulas Salivares (3.02.04.00-3)" },
  { codigo: "30204089", descricao: "Parotidectomia total com sacrifício do nervo facial,", secao: "Glândulas Salivares (3.02.04.00-3)" },
  { codigo: "30204097", descricao: "Plastia de ducto salivar ou exérese de cálculo ou de", secao: "Glândulas Salivares (3.02.04.00-3)" },
  { codigo: "30204100", descricao: "Ressecção de tumor de glândula sublingual", secao: "Glândulas Salivares (3.02.04.00-3)" },
  { codigo: "30205018", descricao: "Abscesso faríngeo - qualquer área", secao: "Faringe (3.02.05.00-0)" },
  { codigo: "30205026", descricao: "Adeno tonsilectomia - revisão cirúrgica", secao: "Faringe (3.02.05.00-0)" },
  { codigo: "30205034", descricao: "Adeno-amigdalectomia", secao: "Faringe (3.02.05.00-0)" },
  { codigo: "30205042", descricao: "Adenoidectomia", secao: "Faringe (3.02.05.00-0)" },
  { codigo: "30205271", descricao: "Adenoidectomia por videoendoscopia", secao: "Faringe (3.02.05.00-0)" },
  { codigo: "30205050", descricao: "Amigdalectomia das palatinas", secao: "Faringe (3.02.05.00-0)" },
  { codigo: "30205069", descricao: "Amigdalectomia lingual", secao: "Faringe (3.02.05.00-0)" },
  { codigo: "30205077", descricao: "Biópsia do cavum, orofaringe ou hipofaringe", secao: "Faringe (3.02.05.00-0)" },
  { codigo: "30205085", descricao: "Cauterização (qualquer técnica) por sessão", secao: "Faringe (3.02.05.00-0)" },
  { codigo: "30205093", descricao: "Corpo estranho de faringe - retirada em consultório", secao: "Faringe (3.02.05.00-0)" },
  { codigo: "30205107", descricao: "Corpo estranho de faringe - retirada sob anestesia geral", secao: "Faringe (3.02.05.00-0)" },
  { codigo: "30205115", descricao: "Criptólise amigdaliana", secao: "Faringe (3.02.05.00-0)" },
  { codigo: "30205140", descricao: "Faringolaringectomia", secao: "Faringe (3.02.05.00-0)" },
  { codigo: "30205158", descricao: "Faringolaringoesofagectomia total", secao: "Faringe (3.02.05.00-0)" },
  { codigo: "30205174", descricao: "Ressecção de tumor de faringe (via bucal ou nasal)", secao: "Faringe (3.02.05.00-0)" },
  { codigo: "30205182", descricao: "Ressecção de tumor de faringe com acesso por", secao: "Faringe (3.02.05.00-0)" },
  { codigo: "30205190", descricao: "Ressecção de tumor de faringe com mandibulectomia", secao: "Faringe (3.02.05.00-0)" },
  { codigo: "30205204", descricao: "Ressecção de tumor de faringe por mandibulotomia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30205212", descricao: "Ressecção de tumor de nasofaringe via endoscópica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30205220", descricao: "Tonsilectomia a laser", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30205239", descricao: "Tumor de boca ou faringe - ressecção", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30205247", descricao: "Uvulopalatofaringoplastia (qualquer técnica)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30205263", descricao: "Uvulopalatofaringoplastia por radiofrequência", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30206014", descricao: "Alargamento de traqueostomia", secao: "Laringe (3.02.06.00-6)" },
  { codigo: "30206022", descricao: "Aritenoidectomia microcirúrgica", secao: "Laringe (3.02.06.00-6)" },
  { codigo: "30206030", descricao: "Aritenoidectomia ou aritenopexia via externa", secao: "Laringe (3.02.06.00-6)" },
  { codigo: "30206049", descricao: "Confecção de fístula tráqueo-esofágica para prótese", secao: "Laringe (3.02.06.00-6)" },
  { codigo: "30206065", descricao: "Exérese de tumor por via endoscópica", secao: "Laringe (3.02.06.00-6)" },
  { codigo: "30206103", descricao: "Injeção intralaríngea de toxina botulínica", secao: "Laringe (3.02.06.00-6)" },
  { codigo: "30206120", descricao: "Laringectomia parcial", secao: "Laringe (3.02.06.00-6)" },
  { codigo: "30206138", descricao: "Laringectomia total", secao: "Laringe (3.02.06.00-6)" },
  { codigo: "30206200", descricao: "Laringotraqueoplastia", secao: "Laringe (3.02.06.00-6)" },
  { codigo: "30206219", descricao: "Microcirurgia com laser para remoção de lesões", secao: "Laringe (3.02.06.00-6)" },
  { codigo: "30206227", descricao: "Microcirurgia com uso de laser para ressecção", secao: "Laringe (3.02.06.00-6)" },
  { codigo: "30206235", descricao: "Microcirurgia para decorticação ou tratamento de", secao: "Laringe (3.02.06.00-6)" },
  { codigo: "30206243", descricao: "Microcirurgia para remoção de cisto ou lesão intracordal", secao: "Laringe (3.02.06.00-6)" },
  { codigo: "30206251", descricao: "Microcirurgia para ressecção de papiloma", secao: "Laringe (3.02.06.00-6)" },
  { codigo: "30206260", descricao: "Microcirurgia para ressecção de pólipo, nódulo ou", secao: "Laringe (3.02.06.00-6)" },
  { codigo: "30206278", descricao: "Microcirurgia para tratamento de paralisia de prega vocal", secao: "Laringe (3.02.06.00-6)" },
  { codigo: "30206294", descricao: "Reconstrução para fonação após laringectomia", secao: "Laringe (3.02.06.00-6)" },
  { codigo: "30206308", descricao: "Tiroplastia tipo 1 com rotação de aritenóide", secao: "Laringe (3.02.06.00-6)" },
  { codigo: "30206316", descricao: "Tiroplastia tipo 1 simples", secao: "Laringe (3.02.06.00-6)" },
  { codigo: "30206324", descricao: "Tiroplastia tipo 2 ou 3", secao: "Laringe (3.02.06.00-6)" },
  { codigo: "30206359", descricao: "Tratamento cirúrgico da estenose laringo-traqueal", secao: "Laringe (3.02.06.00-6)" },
  { codigo: "30206367", descricao: "Tratamento cirúrgico de trauma laríngeo (agudo)", secao: "Laringe (3.02.06.00-6)" },
  { codigo: "30207088", descricao: "Fratura simples de mandíbula com contenção e bloqueio", secao: "Trauma Crânio-Maxilo-Facial (3.02.07.00-2)" },
  { codigo: "30207118", descricao: "Fratura cominutiva de mandíbula - redução cirúrgica com", secao: "Trauma Crânio-Maxilo-Facial (3.02.07.00-2)" },
  { codigo: "30207142", descricao: "Fratura de maxila, tipo Lefort I e II - redução e aplicação", secao: "Trauma Crânio-Maxilo-Facial (3.02.07.00-2)" },
  { codigo: "30207150", descricao: "Fratura de maxila, tipo Lefort III - redução e aplicação de", secao: "Trauma Crânio-Maxilo-Facial (3.02.07.00-2)" },
  { codigo: "30207061", descricao: "Fratura do arco zigomático - redução instrumental", secao: "Trauma Crânio-Maxilo-Facial (3.02.07.00-2)" },
  { codigo: "30207100", descricao: "Fratura naso etmóido órbito-etmoidal", secao: "Trauma Crânio-Maxilo-Facial (3.02.07.00-2)" },
  { codigo: "30207096", descricao: "Fratura simples de mandíbula - redução cirúrgica com", secao: "Trauma Crânio-Maxilo-Facial (3.02.07.00-2)" },
  { codigo: "30207126", descricao: "Fraturas complexas de mandíbula - redução cirúrgica com", secao: "Trauma Crânio-Maxilo-Facial (3.02.07.00-2)" },
  { codigo: "30207045", descricao: "Redução de fratura de seio frontal (acesso coronal)", secao: "Trauma Crânio-Maxilo-Facial (3.02.07.00-2)" },
  { codigo: "30207037", descricao: "Redução de fratura de seio frontal (acesso frontal)", secao: "Trauma Crânio-Maxilo-Facial (3.02.07.00-2)" },
  { codigo: "30207231", descricao: "Redução de luxação do ATM", secao: "Trauma Crânio-Maxilo-Facial (3.02.07.00-2)" },
  { codigo: "30207223", descricao: "Tratamento conservador de fratura de ossos", secao: "Trauma Crânio-Maxilo-Facial (3.02.07.00-2)" },
  { codigo: "30208017", descricao: "Artroplastia para luxação recidivante da articulação", secao: "Cirurgia Reparadora E Funcional Da Face (3.02.08.00-9)" },
  { codigo: "30208025", descricao: "Osteoplastia para prognatismo, micrognatismo ou", secao: "Cirurgia Reparadora E Funcional Da Face (3.02.08.00-9)" },
  { codigo: "30208084", descricao: "Osteotomia crânio-maxilares complexas", secao: "Cirurgia Reparadora E Funcional Da Face (3.02.08.00-9)" },
  { codigo: "30208050", descricao: "Osteotomia tipo Lefort I", secao: "Cirurgia Reparadora E Funcional Da Face (3.02.08.00-9)" },
  { codigo: "30208068", descricao: "Osteotomia tipo Lefort II", secao: "Cirurgia Reparadora E Funcional Da Face (3.02.08.00-9)" },
  { codigo: "30208076", descricao: "Osteotomia tipo Lefort III - extracraniana", secao: "Cirurgia Reparadora E Funcional Da Face (3.02.08.00-9)" },
  { codigo: "30208033", descricao: "Osteotomias alvéolo palatinas", secao: "Cirurgia Reparadora E Funcional Da Face (3.02.08.00-9)" },
  { codigo: "30208041", descricao: "Osteotomias segmentares da maxila ou malar", secao: "Cirurgia Reparadora E Funcional Da Face (3.02.08.00-9)" },
  { codigo: "30208106", descricao: "Reconstrução parcial da mandíbula com enxerto ósseo", secao: "Cirurgia Reparadora E Funcional Da Face (3.02.08.00-9)" },
  { codigo: "30208114", descricao: "Reconstrução total de mandíbula com prótese e", secao: "Cirurgia Reparadora E Funcional Da Face (3.02.08.00-9)" },
  { codigo: "30208092", descricao: "Redução simples da luxação da articulação têmporo-", secao: "Cirurgia Reparadora E Funcional Da Face (3.02.08.00-9)" },
  { codigo: "30208130", descricao: "Translocação etmóido orbital para tratamento do", secao: "Cirurgia Reparadora E Funcional Da Face (3.02.08.00-9)" },
  { codigo: "30208122", descricao: "Tratamento cirúrgico de anquilose da articulação", secao: "Cirurgia Reparadora E Funcional Da Face (3.02.08.00-9)" },
  { codigo: "30209056", descricao: "Correção cirúrgica de depressão (afundamento)", secao: "Sequelas De Trauma Da Face (3.02.09.00-5)" },
  { codigo: "30209048", descricao: "Osteoplastias da órbita", secao: "Sequelas De Trauma Da Face (3.02.09.00-5)" },
  { codigo: "30209021", descricao: "Osteoplastias de mandíbula", secao: "Sequelas De Trauma Da Face (3.02.09.00-5)" },
  { codigo: "30209030", descricao: "Osteoplastias do arco zigomático", secao: "Sequelas De Trauma Da Face (3.02.09.00-5)" },
  { codigo: "30209013", descricao: "Osteoplastias etmóido orbitais", secao: "Sequelas De Trauma Da Face (3.02.09.00-5)" },
  { codigo: "30210020", descricao: "Correção de tumores, cicatrizes ou ferimentos com o", secao: "Face (3.02.10.00-3)" },
  { codigo: "30210127", descricao: "Exérese de tumor benigno, cisto ou fístula", secao: "Face (3.02.10.00-3)" },
  { codigo: "30210119", descricao: "Exérese de tumor maligno de pele", secao: "Face (3.02.10.00-3)" },
  { codigo: "30210054", descricao: "Paralisia facial - reanimação com o músculo temporal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30210038", descricao: "Paralisia facial - reanimação com o músculo temporal (região", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30210062", descricao: "Paralisia facial - reanimação com o músculo temporal (região", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30210046", descricao: "Paralisia facial - reanimação com o músculo temporal (região", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30210089", descricao: "Reconstrução com retalho axial da artéria temporal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30210070", descricao: "Reconstrução com retalhos axiais supra-orbitais e", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30210097", descricao: "Reconstrução com retalhos em VY de pedículo subarterial", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30210100", descricao: "Reconstrução com rotação do músculo temporal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30211018", descricao: "Biópsia de mandíbula", secao: "Mandíbula (3.02.11.00-0)" },
  { codigo: "30211042", descricao: "Hemimandibulectomia ou ressecção segmentar ou", secao: "Mandíbula (3.02.11.00-0)" },
  { codigo: "30211050", descricao: "Mandibulectomia total", secao: "Mandíbula (3.02.11.00-0)" },
  { codigo: "30211034", descricao: "Ressecção de tumor de mandíbula com desarticulação", secao: "Mandíbula (3.02.11.00-0)" },
  { codigo: "30212014", descricao: "Cervicotomia exploradora", secao: "Pescoço (3.02.12.00-6)" },
  { codigo: "30212022", descricao: "Drenagem de abscesso cervical profundo", secao: "Pescoço (3.02.12.00-6)" },
  { codigo: "30212049", descricao: "Esvaziamento cervical radical ampliado", secao: "Pescoço (3.02.12.00-6)" },
  { codigo: "30212065", descricao: "Exérese de cisto branquial", secao: "Pescoço (3.02.12.00-6)" },
  { codigo: "30212073", descricao: "Exérese de cisto tireoglosso", secao: "Pescoço (3.02.12.00-6)" },
  { codigo: "30212081", descricao: "Exérese de tumor benigno, cisto ou fístula cervical", secao: "Pescoço (3.02.12.00-6)" },
  { codigo: "30212090", descricao: "Linfadenectomia profunda", secao: "Pescoço (3.02.12.00-6)" },
  { codigo: "30212111", descricao: "Neuroblastoma cervical - exérese", secao: "Pescoço (3.02.12.00-6)" },
  { codigo: "30212120", descricao: "Punção-biópsia de pescoço", secao: "Pescoço (3.02.12.00-6)" },
  { codigo: "30212138", descricao: "Reconstrução de esôfago cervical", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30212146", descricao: "Ressecção de tumor de corpo carotídeo", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30212154", descricao: "Retração cicatricial cervical - por estágio", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30212162", descricao: "Retração cicatricial cervical com emprego de expansores", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30212170", descricao: "Torcicolo congênito - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30212189", descricao: "Tratamento cirúrgico da lipomatose cervical", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30212197", descricao: "Tratamento cirúrgico de fístula com retalho cutâneo", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30213010", descricao: "Biópsia de tireóide", secao: "Tireóide (3.02.13.00-2)" },
  { codigo: "30213029", descricao: "Bócio mergulhante: extirpação por acesso cérvico-torácico", secao: "Tireóide (3.02.13.00-2)" },
  { codigo: "30213037", descricao: "Istmectomia ou nodulectomia", secao: "Tireóide (3.02.13.00-2)" },
  { codigo: "30213045", descricao: "Tireoidectomia parcial", secao: "Tireóide (3.02.13.00-2)" },
  { codigo: "30213053", descricao: "Tireoidectomia total", secao: "Tireóide (3.02.13.00-2)" },
  { codigo: "30214017", descricao: "Biópsia de paratireóide", secao: "Paratireóide (3.02.14.00-9)" },
  { codigo: "30214025", descricao: "Paratireoidectomia com toracotomia", secao: "Paratireóide (3.02.14.00-9)" },
  { codigo: "30214033", descricao: "Reimplante de paratireóide previamente preservada", secao: "Paratireóide (3.02.14.00-9)" },
  { codigo: "30214041", descricao: "Tratamento cirúrgico do hiperparatireoidismo primário", secao: "Paratireóide (3.02.14.00-9)" },
  { codigo: "30214050", descricao: "Tratamento cirúrgico do hiperparatireoidismo secundário", secao: "Paratireóide (3.02.14.00-9)" },
  { codigo: "30215013", descricao: "Cranioplastia", secao: "Crânio (3.02.15.00-5)" },
  { codigo: "30215021", descricao: "Craniotomia descompressiva", secao: "Crânio (3.02.15.00-5)" },
  { codigo: "30215030", descricao: "Craniotomia para tumores ósseos", secao: "Crânio (3.02.15.00-5)" },
  { codigo: "30215048", descricao: "Reconstrução craniana ou craniofacial", secao: "Crânio (3.02.15.00-5)" },
  { codigo: "30215056", descricao: "Retirada de cranioplastia", secao: "Crânio (3.02.15.00-5)" },
  { codigo: "30215072", descricao: "Tratamento cirúrgico da craniossinostose", secao: "Crânio (3.02.15.00-5)" },
  { codigo: "30215080", descricao: "Tratamento cirúrgico da fratura do crânio - afundamento", secao: "Crânio (3.02.15.00-5)" },
  { codigo: "30215099", descricao: "Tratamento cirúrgico da osteomielite de crânio", secao: "Crânio (3.02.15.00-5)" },
  { codigo: "30301017", descricao: "Abscesso de pálpebra - drenagem", secao: "Pálpebra (3.03.01.00-9)" },
  { codigo: "30301025", descricao: "Biópsia de pálpebra", secao: "Pálpebra (3.03.01.00-9)" },
  { codigo: "30301041", descricao: "Calázio", secao: "Pálpebra (3.03.01.00-9)" },
  { codigo: "30301050", descricao: "Cantoplastia lateral", secao: "Pálpebra (3.03.01.00-9)" },
  { codigo: "30301068", descricao: "Cantoplastia medial", secao: "Pálpebra (3.03.01.00-9)" },
  { codigo: "30301076", descricao: "Coloboma - com plástica", secao: "Pálpebra (3.03.01.00-9)" },
  { codigo: "30301084", descricao: "Correção cirúrgica de ectrópio ou entrópio", secao: "Pálpebra (3.03.01.00-9)" },
  { codigo: "30301092", descricao: "Correção de bolsas palpebrais - unilateral", secao: "Pálpebra (3.03.01.00-9)" },
  { codigo: "30301106", descricao: "Dermatocalaze ou blefarocalaze - unilateral", secao: "Pálpebra (3.03.01.00-9)" },
  { codigo: "30301114", descricao: "Epicanto - correção cirúrgica - unilateral", secao: "Pálpebra (3.03.01.00-9)" },
  { codigo: "30301122", descricao: "Epilação", secao: "Pálpebra (3.03.01.00-9)" },
  { codigo: "30301130", descricao: "Epilação de cílios (diatermo-coagulação)", secao: "Pálpebra (3.03.01.00-9)" },
  { codigo: "30301149", descricao: "Fissura palpebral - correção cirúrgica", secao: "Pálpebra (3.03.01.00-9)" },
  { codigo: "30301157", descricao: "Lagoftalmo - correção cirúrgica", secao: "Pálpebra (3.03.01.00-9)" },
  { codigo: "30301165", descricao: "Pálpebra - reconstrução parcial (com ou sem ressecção", secao: "Pálpebra (3.03.01.00-9)" },
  { codigo: "30301173", descricao: "Pálpebra - reconstrução total (com ou sem ressecção de", secao: "Pálpebra (3.03.01.00-9)" },
  { codigo: "30301181", descricao: "Ptose palpebral - correção cirúrgica - unilateral", secao: "Pálpebra (3.03.01.00-9)" },
  { codigo: "30301190", descricao: "Ressecção de tumores palpebrais", secao: "Pálpebra (3.03.01.00-9)" },
  { codigo: "30301203", descricao: "Retração palpebral", secao: "Pálpebra (3.03.01.00-9)" },
  { codigo: "30301211", descricao: "Simbléfaro com ou sem enxerto - correção cirúrgica", secao: "Pálpebra (3.03.01.00-9)" },
  { codigo: "30301220", descricao: "Supercílio - reconstrução total", secao: "Pálpebra (3.03.01.00-9)" },
  { codigo: "30301238", descricao: "Sutura de pálpebra", secao: "Pálpebra (3.03.01.00-9)" },
  { codigo: "30301254", descricao: "Telecanto - correção cirúrgica - unilateral", secao: "Pálpebra (3.03.01.00-9)" },
  { codigo: "30301262", descricao: "Triquíase com ou sem enxerto", secao: "Pálpebra (3.03.01.00-9)" },
  { codigo: "30301270", descricao: "Xantelasma palpebral - exérese - unilateral", secao: "Pálpebra (3.03.01.00-9)" },
  { codigo: "30302013", descricao: "Correção da enoftalmia", secao: "Cavidade Orbitária (3.03.02.00-5)" },
  { codigo: "30302021", descricao: "Descompressão de órbita ou nervo ótico", secao: "Cavidade Orbitária (3.03.02.00-5)" },
  { codigo: "30302030", descricao: "Exenteração com osteotomia", secao: "Cavidade Orbitária (3.03.02.00-5)" },
  { codigo: "30302048", descricao: "Exenteração de órbita", secao: "Cavidade Orbitária (3.03.02.00-5)" },
  { codigo: "30302056", descricao: "Exérese de tumor com abordagem craniofacial oncológica", secao: "Cavidade Orbitária (3.03.02.00-5)" },
  { codigo: "30302064", descricao: "Fratura de órbita - redução cirúrgica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30302072", descricao: "Fratura de órbita - redução cirúrgica e enxerto ósseo", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30302080", descricao: "Implante secundário de órbita", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30302099", descricao: "Microcirurgia para tumores orbitários", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30302102", descricao: "Reconstituição de paredes orbitárias", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30302110", descricao: "Reconstrução parcial da cavidade orbital - por estágio", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30302129", descricao: "Reconstrução total da cavidade orbital - por estágio", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30302137", descricao: "Tumor de órbita - exérese", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30303010", descricao: "Autotransplante conjuntival", secao: "Conjuntiva (3.03.03.00-1)" },
  { codigo: "30303028", descricao: "Biópsia de conjuntiva", secao: "Conjuntiva (3.03.03.00-1)" },
  { codigo: "30303036", descricao: "Enxerto de membrana amniótica", secao: "Conjuntiva (3.03.03.00-1)" },
  { codigo: "30303052", descricao: "Plástica de conjuntiva", secao: "Conjuntiva (3.03.03.00-1)" },
  { codigo: "30303060", descricao: "Pterígio - exérese", secao: "Conjuntiva (3.03.03.00-1)" },
  { codigo: "30303079", descricao: "Reconstituição de fundo de saco", secao: "Conjuntiva (3.03.03.00-1)" },
  { codigo: "30303087", descricao: "Sutura de conjuntiva", secao: "Conjuntiva (3.03.03.00-1)" },
  { codigo: "30303095", descricao: "Transplante de limbo", secao: "Conjuntiva (3.03.03.00-1)" },
  { codigo: "30303109", descricao: "Tumor de conjuntiva - exérese", secao: "Conjuntiva (3.03.03.00-1)" },
  { codigo: "30304016", descricao: "Cauterização de córnea", secao: "Córnea (3.03.04.00-8)" },
  { codigo: "30304032", descricao: "Corpo estranho da córnea - retirada", secao: "Córnea (3.03.04.00-8)" },
  { codigo: "30304105", descricao: "Delaminação corneana com fotoablação estromal - LASIK", secao: "Córnea (3.03.04.00-8)" },
  { codigo: "30304091", descricao: "Fotoablação de superfície convencional - PRK", secao: "Córnea (3.03.04.00-8)" },
  { codigo: "30304083", descricao: "Implante de anel intra-estromal", secao: "Córnea (3.03.04.00-8)" },
  { codigo: "30304040", descricao: "PTK ceratectomia fototerapêutica - monocular", secao: "Córnea (3.03.04.00-8)" },
  { codigo: "30304059", descricao: "Recobrimento conjuntival", secao: "Córnea (3.03.04.00-8)" },
  { codigo: "30304067", descricao: "Sutura de córnea (com ou sem hérnia de íris)", secao: "Córnea (3.03.04.00-8)" },
  { codigo: "30304075", descricao: "Tarsoconjuntivoceratoplastia", secao: "Córnea (3.03.04.00-8)" },
  { codigo: "30305012", descricao: "Paracentese da câmara anterior", secao: "Câmara Anterior (3.03.05.00-4)" },
  { codigo: "30305020", descricao: "Reconstrução da câmara anterior", secao: "Câmara Anterior (3.03.05.00-4)" },
  { codigo: "30305039", descricao: "Remoção de hifema", secao: "Câmara Anterior (3.03.05.00-4)" },
  { codigo: "30305047", descricao: "Retirada de corpo estranho da câmara anterior", secao: "Câmara Anterior (3.03.05.00-4)" },
  { codigo: "30306019", descricao: "Capsulotomia YAG ou cirúrgica", secao: "Cristalino (3.03.06.00-0)" },
  { codigo: "30306043", descricao: "Facectomia sem implante", secao: "Cristalino (3.03.06.00-0)" },
  { codigo: "30306051", descricao: "Fixação iriana de lente intra-ocular", secao: "Cristalino (3.03.06.00-0)" },
  { codigo: "30306078", descricao: "Remoção de pigmentos da lente intra-ocular com yag-laser", secao: "Cristalino (3.03.06.00-0)" },
  { codigo: "30307015", descricao: "Biópsia de tumor via pars plana", secao: "Corpo Vítreo (3.03.07.00-7)" },
  { codigo: "30307023", descricao: "Biópsia de vítreo via pars plana", secao: "Corpo Vítreo (3.03.07.00-7)" },
  { codigo: "30307031", descricao: "Endolaser/Endodiatermia", secao: "Corpo Vítreo (3.03.07.00-7)" },
  { codigo: "30307040", descricao: "Implante de silicone intravítreo", secao: "Corpo Vítreo (3.03.07.00-7)" },
  { codigo: "30307066", descricao: "Membranectomia EPI ou sub-retiniana", secao: "Corpo Vítreo (3.03.07.00-7)" },
  { codigo: "30307074", descricao: "Retirada de corpo estranho", secao: "Corpo Vítreo (3.03.07.00-7)" },
  { codigo: "30307082", descricao: "Retirada de óleo de silicone via pars plana", secao: "Corpo Vítreo (3.03.07.00-7)" },
  { codigo: "30307147", descricao: "Tratamento ocular quimioterápico com antiangiogênico.", secao: "Corpo Vítreo (3.03.07.00-7)" },
  { codigo: "30307104", descricao: "Vitrectomia a céu aberto - ceratoprótese", secao: "Corpo Vítreo (3.03.07.00-7)" },
  { codigo: "30307112", descricao: "Vitrectomia anterior", secao: "Corpo Vítreo (3.03.07.00-7)" },
  { codigo: "30307120", descricao: "Vitrectomia vias pars plana", secao: "Corpo Vítreo (3.03.07.00-7)" },
  { codigo: "30308011", descricao: "Biópsia de esclera", secao: "Esclera (3.03.08.00-3)" },
  { codigo: "30308020", descricao: "Enxerto de esclera (qualquer técnica)", secao: "Esclera (3.03.08.00-3)" },
  { codigo: "30308038", descricao: "Sutura de esclera", secao: "Esclera (3.03.08.00-3)" },
  { codigo: "30309018", descricao: "Enucleação ou evisceração com ou sem implante", secao: "Bulbo Ocular (3.03.09.00-0)" },
  { codigo: "30309026", descricao: "Injeção retrobulbar", secao: "Bulbo Ocular (3.03.09.00-0)" },
  { codigo: "30309034", descricao: "Reconstituição de globo ocular com lesão de estruturas", secao: "Bulbo Ocular (3.03.09.00-0)" },
  { codigo: "30310016", descricao: "Biópsia de íris e corpo ciliar", secao: "Íris E Corpo Ciliar (3.03.10.00-8)" },
  { codigo: "30310024", descricao: "Cicloterapia - qualquer técnica", secao: "Íris E Corpo Ciliar (3.03.10.00-8)" },
  { codigo: "30310059", descricao: "Drenagem de descolamento de coróide", secao: "Íris E Corpo Ciliar (3.03.10.00-8)" },
  { codigo: "30310067", descricao: "Fototrabeculoplastia (laser)", secao: "Íris E Corpo Ciliar (3.03.10.00-8)" },
  { codigo: "30310075", descricao: "Goniotomia ou trabeculotomia", secao: "Íris E Corpo Ciliar (3.03.10.00-8)" },
  { codigo: "30310083", descricao: "Iridectomia (laser ou cirúrgica)", secao: "Íris E Corpo Ciliar (3.03.10.00-8)" },
  { codigo: "30310091", descricao: "Iridociclectomia", secao: "Íris E Corpo Ciliar (3.03.10.00-8)" },
  { codigo: "30310105", descricao: "Sinequiotomia (cirúrgica)", secao: "Íris E Corpo Ciliar (3.03.10.00-8)" },
  { codigo: "30310113", descricao: "Sinequiotomia (laser)", secao: "Íris E Corpo Ciliar (3.03.10.00-8)" },
  { codigo: "30311012", descricao: "Biópsia de músculos", secao: "Músculos (3.03.11.00-4)" },
  { codigo: "30311020", descricao: "Cirurgia com sutura ajustável", secao: "Músculos (3.03.11.00-4)" },
  { codigo: "30311039", descricao: "Estrabismo ciclo vertical/transposição - monocular", secao: "Músculos (3.03.11.00-4)" },
  { codigo: "30311047", descricao: "Estrabismo horizontal - monocular", secao: "Músculos (3.03.11.00-4)" },
  { codigo: "30311055", descricao: "Injeção de toxina botulínica - monocular", secao: "Músculos (3.03.11.00-4)" },
  { codigo: "30312019", descricao: "Aplicação de placa radiativa episcleral", secao: "Retina (3.03.12.00-0)" },
  { codigo: "30312027", descricao: "Biópsia de retina", secao: "Retina (3.03.12.00-0)" },
  { codigo: "30312035", descricao: "Exérese de tumor de coróide e/ou corpo ciliar", secao: "Retina (3.03.12.00-0)" },
  { codigo: "30312043", descricao: "Fotocoagulação (laser) - por sessão - monocular", secao: "Retina (3.03.12.00-0)" },
  { codigo: "30312051", descricao: "Infusão de gás expansor", secao: "Retina (3.03.12.00-0)" },
  { codigo: "30312060", descricao: "Pancrioterapia periférica", secao: "Retina (3.03.12.00-0)" },
  { codigo: "30312078", descricao: "Remoção de implante episcleral", secao: "Retina (3.03.12.00-0)" },
  { codigo: "30312094", descricao: "Retinopexia pneumática", secao: "Retina (3.03.12.00-0)" },
  { codigo: "30312116", descricao: "Retinotomia relaxante", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30313015", descricao: "Cirurgia da glândula lacrimal", secao: "Vias Lacrimais (3.03.13.00-7)" },
  { codigo: "30313023", descricao: "Dacriocistectomia - unilateral", secao: "Vias Lacrimais (3.03.13.00-7)" },
  { codigo: "30313031", descricao: "Dacriocistorrinostomia com ou sem intubação - unilateral", secao: "Vias Lacrimais (3.03.13.00-7)" },
  { codigo: "30313040", descricao: "Fechamento dos pontos lacrimais", secao: "Vias Lacrimais (3.03.13.00-7)" },
  { codigo: "30313058", descricao: "Reconstituição de vias lacrimais com silicone ou outro", secao: "Vias Lacrimais (3.03.13.00-7)" },
  { codigo: "30313066", descricao: "Sondagem das vias lacrimais - com ou sem lavagem", secao: "Vias Lacrimais (3.03.13.00-7)" },
  { codigo: "30401011", descricao: "Biópsia de pavilhão auricular", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30401020", descricao: "Exérese de tumor com abordagem craniofacial oncológica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30401038", descricao: "Exérese de tumor com fechamento primário", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30401046", descricao: "Outros defeitos congênitos que não a microtia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30401054", descricao: "Reconstrução de orelha - retoques", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30401062", descricao: "Reconstrução de unidade anatômica do pavilhão", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30401070", descricao: "Reconstrução total de orelha - único estágio", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30401089", descricao: "Ressecção de tumor de pavilhão auricular, incluindo parte", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30401097", descricao: "Ressecção subtotal ou total de orelha", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30401100", descricao: "Tratamento cirúrgico de sinus pré-auricular", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30402018", descricao: "Aspiração auricular", secao: "Orelha Externa (3.04.02.00-0)" },
  { codigo: "30402026", descricao: "Biópsia (orelha externa)", secao: "Orelha Externa (3.04.02.00-0)" },
  { codigo: "30402034", descricao: "Cisto pré-auricular (coloboma auris) - exérese - unilateral", secao: "Orelha Externa (3.04.02.00-0)" },
  { codigo: "30402042", descricao: "Corpos estranhos, pólipos ou biópsia - em consultório", secao: "Orelha Externa (3.04.02.00-0)" },
  { codigo: "30402050", descricao: "Corpos estranhos, pólipos ou biópsia - em hospital sob", secao: "Orelha Externa (3.04.02.00-0)" },
  { codigo: "30402069", descricao: "Estenose de conduto auditivo externo - correção", secao: "Orelha Externa (3.04.02.00-0)" },
  { codigo: "30402077", descricao: "Furúnculo - drenagem (ouvido)", secao: "Orelha Externa (3.04.02.00-0)" },
  { codigo: "30402085", descricao: "Pericondrite de pavilhão - tratamento cirúrgico com", secao: "Orelha Externa (3.04.02.00-0)" },
  { codigo: "30402093", descricao: "Tumor benigno de conduto auditivo externo - exérese", secao: "Orelha Externa (3.04.02.00-0)" },
  { codigo: "30403014", descricao: "Cauterização de membrana timpânica", secao: "Orelha Média (3.04.03.00-6)" },
  { codigo: "30403030", descricao: "Estapedectomia ou estapedotomia", secao: "Orelha Média (3.04.03.00-6)" },
  { codigo: "30403049", descricao: "Exploração e descompressão parcial do nervo facial", secao: "Orelha Média (3.04.03.00-6)" },
  { codigo: "30403057", descricao: "Fístula perilinfática - fechamento cirúrgico", secao: "Orelha Média (3.04.03.00-6)" },
  { codigo: "30403065", descricao: "Glomus jugular - ressecção", secao: "Orelha Média (3.04.03.00-6)" },
  { codigo: "30403073", descricao: "Glomus timpânicus - ressecção", secao: "Orelha Média (3.04.03.00-6)" },
  { codigo: "30403090", descricao: "Ouvido congênito - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30403103", descricao: "Paracentese do tímpano - miringotomia, unilateral -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30403162", descricao: "Paracentese do tímpano, unilateral, em hospital -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30403111", descricao: "Tímpano-mastoidectomia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30403120", descricao: "Timpanoplastia com reconstrução da cadeia ossicular", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30403138", descricao: "Timpanoplastia tipo I - miringoplastia - unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30403146", descricao: "Timpanotomia exploradora - unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30403154", descricao: "Timpanotomia para tubo de ventilação - unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30404010", descricao: "Doença de Meniere - tratamento cirúrgico - descompressão", secao: "Orelha Interna (3.04.04.00-2)" },
  { codigo: "30404029", descricao: "Enxerto parcial intratemporal do nervo facial - do foramem", secao: "Orelha Interna (3.04.04.00-2)" },
  { codigo: "30404037", descricao: "Enxerto parcial intratemporal do nervo facial - do gânglio", secao: "Orelha Interna (3.04.04.00-2)" },
  { codigo: "30404045", descricao: "Enxerto total do nervo facial intratemporal", secao: "Orelha Interna (3.04.04.00-2)" },
  { codigo: "30404053", descricao: "Exploração e descompressão total do nervo facial", secao: "Orelha Interna (3.04.04.00-2)" },
  { codigo: "30404061", descricao: "Implante coclear (exceto a prótese)", secao: "Orelha Interna (3.04.04.00-2)" },
  { codigo: "30404070", descricao: "Injeção de drogas intratimpânicas", secao: "Orelha Interna (3.04.04.00-2)" },
  { codigo: "30404088", descricao: "Labirintectomia (membranosa ou óssea) - sem audição", secao: "Orelha Interna (3.04.04.00-2)" },
  { codigo: "30404096", descricao: "Neurectomia vestibular para fossa média ou posterior", secao: "Orelha Interna (3.04.04.00-2)" },
  { codigo: "30404100", descricao: "Neurectomia vestibular translabiríntica - sem audição", secao: "Orelha Interna (3.04.04.00-2)" },
  { codigo: "30404126", descricao: "Ressecção do osso temporal", secao: "Orelha Interna (3.04.04.00-2)" },
  { codigo: "30404134", descricao: "Tumor do nervo acústico - ressecção via translabiríntica ou", secao: "Orelha Interna (3.04.04.00-2)" },
  { codigo: "30501016", descricao: "Abscesso ou hematoma de septo nasal - drenagem", secao: "Nariz (3.05.01.00-8)" },
  { codigo: "30501024", descricao: "Abscesso ou hematoma de septo nasal - drenagem sob", secao: "Nariz (3.05.01.00-8)" },
  { codigo: "30501040", descricao: "Alongamento de columela", secao: "Nariz (3.05.01.00-8)" },
  { codigo: "30501059", descricao: "Biópsia de nariz", secao: "Nariz (3.05.01.00-8)" },
  { codigo: "30501067", descricao: "Corneto inferior - cauterização linear - unilateral", secao: "Nariz (3.05.01.00-8)" },
  { codigo: "30501083", descricao: "Corpos estranhos - retirada em consultório (nariz)", secao: "Nariz (3.05.01.00-8)" },
  { codigo: "30501091", descricao: "Corpos estranhos - retirada sob anestesia geral / hospital", secao: "Nariz (3.05.01.00-8)" },
  { codigo: "30501474", descricao: "Corpos estranhos - retirada sob anestesia geral / hospital", secao: "Nariz (3.05.01.00-8)" },
  { codigo: "30501113", descricao: "Epistaxe - cauterização (qualquer técnica)", secao: "Nariz (3.05.01.00-8)" },
  { codigo: "30501121", descricao: "Epistaxe - cauterização da artéria esfenopalatina com", secao: "Nariz (3.05.01.00-8)" },
  { codigo: "30501482", descricao: "Epistaxe - cauterização da artéria esfenopalatina com", secao: "Nariz (3.05.01.00-8)" },
  { codigo: "30501130", descricao: "Epistaxe - cauterização das artérias etmoidais com", secao: "Nariz (3.05.01.00-8)" },
  { codigo: "30501148", descricao: "Epistaxe - ligadura das artérias etmoidais -", secao: "Nariz (3.05.01.00-8)" },
  { codigo: "30501156", descricao: "Epistaxe - tamponamento antero-posterior", secao: "Nariz (3.05.01.00-8)" },
  { codigo: "30501164", descricao: "Epistaxe - tamponamento anterior", secao: "Nariz (3.05.01.00-8)" },
  { codigo: "30501172", descricao: "Epistaxe - tamponamento antero-posterior sob anestesia", secao: "Nariz (3.05.01.00-8)" },
  { codigo: "30501180", descricao: "Exérese de tumor com abordagem craniofacial oncológica", secao: "Nariz (3.05.01.00-8)" },
  { codigo: "30501199", descricao: "Exérese de tumor nasal por via endoscopica", secao: "Nariz (3.05.01.00-8)" },
  { codigo: "30501202", descricao: "Fechamento de fístula liquórica transnasal", secao: "Nariz (3.05.01.00-8)" },
  { codigo: "30501210", descricao: "Fístula liquórica - tratamento cirúrgico endoscópico", secao: "Nariz (3.05.01.00-8)" },
  { codigo: "30501229", descricao: "Fraturas dos ossos nasais - redução cirúrgica e gesso", secao: "Nariz (3.05.01.00-8)" },
  { codigo: "30501237", descricao: "Fraturas dos ossos nasais - redução incruenta e gesso", secao: "Nariz (3.05.01.00-8)" },
  { codigo: "30501245", descricao: "Imperfuração coanal - correção cirúrgica intranasal", secao: "Nariz (3.05.01.00-8)" },
  { codigo: "30501490", descricao: "Imperfuração coanal - correção cirúrgica intranasal", secao: "Nariz (3.05.01.00-8)" },
  { codigo: "30501253", descricao: "Imperfuração coanal - correção cirúrgica transpalatina", secao: "Nariz (3.05.01.00-8)" },
  { codigo: "30501261", descricao: "Ozena - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30501504", descricao: "Ozena - tratamento cirúrgico por videoendoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30501270", descricao: "Perfuração do septo nasal - correção cirúrgica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30501512", descricao: "Perfuração do septo nasal - correção cirúrgica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30501288", descricao: "Polipectomia - unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30501296", descricao: "Reconstrução de unidade anatômica do nariz - por estágio", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30501300", descricao: "Reconstrução total de nariz - por estágio", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30501318", descricao: "Ressecção de tumores malignos transnasais", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30501326", descricao: "Rinectomia parcial", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30501334", descricao: "Rinectomia total", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30501342", descricao: "Rinoplastia reparadora", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30501350", descricao: "Rinosseptoplastia funcional", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30501520", descricao: "Rinosseptoplastia funcional por videoendoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30501369", descricao: "Septoplastia (qualquer técnica sem vídeo)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30501539", descricao: "Septoplastia por videoendoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30501377", descricao: "Sinéquia nasal - ressecção unilateral - qualquer técnica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30501385", descricao: "Tratamento cirúrgico da atresia narinária", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30501393", descricao: "Tratamento cirúrgico de deformidade nasal congênita", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30501415", descricao: "Tratamento cirúrgico reparador do nariz em sela", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30501423", descricao: "Tratamento de deformidade traumática nasal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30501431", descricao: "Tumor intranasal - exérese por rinotomia lateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30501440", descricao: "Tumor intranasal - exérese por via transnasal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30501458", descricao: "Turbinectomia ou turbinoplastia - unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30501466", descricao: "Turbinoplastia por radiofrequência", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502020", descricao: "Antrostomia maxilar intranasal", secao: "Seios Paranasais (3.05.02.00-4)" },
  { codigo: "30502292", descricao: "Antrostomia maxilar intranasal por videoendoscopia", secao: "Seios Paranasais (3.05.02.00-4)" },
  { codigo: "30502284", descricao: "Antrostomia maxilar, etmoidectomia etc a laser (abertura", secao: "Seios Paranasais (3.05.02.00-4)" },
  { codigo: "30502039", descricao: "Artéria maxilar interna - ligadura transmaxilar", secao: "Seios Paranasais (3.05.02.00-4)" },
  { codigo: "30502306", descricao: "Artéria maxilar interna - ligadura transmaxilar por", secao: "Seios Paranasais (3.05.02.00-4)" },
  { codigo: "30502047", descricao: "Cisto naso-alveolar e globular - exérese", secao: "Seios Paranasais (3.05.02.00-4)" },
  { codigo: "30502063", descricao: "Descompressão transetmoidal do canal óptico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502071", descricao: "Etmoidectomia externa", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502080", descricao: "Etmoidectomia intranasal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502314", descricao: "Etmoidectomia intranasal por videoendoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502098", descricao: "Exérese de tumor com abordagem craniofacial oncológica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502101", descricao: "Exérese de tumor de seios paranasais por via endoscópica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502110", descricao: "Fístula oro-antral - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502128", descricao: "Fístula oronasal - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502136", descricao: "Maxilectomia incluindo exenteração de órbita", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502144", descricao: "Maxilectomia parcial", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502152", descricao: "Maxilectomia total", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502160", descricao: "Pólipo antro-coanal de Killiam - exérese", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502179", descricao: "Punção maxilar transmeática ou via fossa canina", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502187", descricao: "Ressecção de tumor benigno", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502195", descricao: "Seios paranasais - biópsia qualquer via", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502217", descricao: "Sinusectomia frontal com retalho osteoplástico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502225", descricao: "Sinusectomia fronto-etmoidal por via externa", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502209", descricao: "Sinusectomia maxilar - via endonasal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502322", descricao: "Sinusectomia maxilar - via endonasal por videoendoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502233", descricao: "Sinusectomia maxilar - via oral (Caldwell-Luc)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502241", descricao: "Sinusectomia transmaxilar (Ermiro de Lima)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502250", descricao: "Sinusotomia esfenoidal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502349", descricao: "Sinusotomia esfenoidal por videoendoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502268", descricao: "Sinusotomia frontal intranasal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502365", descricao: "Sinusotomia frontal intranasal com balão por", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502357", descricao: "Sinusotomia frontal intranasal por videoendoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30502276", descricao: "Sinusotomia frontal via externa", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30601223", descricao: "Biópsia cirúrgica de costela ou esterno", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601010", descricao: "Correção de deformidades da parede torácica", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601274", descricao: "Correção de deformidades da parede torácica por vídeo", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601029", descricao: "Costectomia (porte para 1 arco costal, 30% deste porte", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601037", descricao: "Esternectomia subtotal", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601045", descricao: "Esternectomia total", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601053", descricao: "Fechamento de pleurostomia", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601304", descricao: "Fratura de costela ou esterno - tratamento conservador", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601231", descricao: "Fratura luxação de esterno ou costela - redução incruenta", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601240", descricao: "Fratura luxação de esterno ou costela - tratamento cirúrgico", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601070", descricao: "Mobilização de retalhos musculares ou do omento", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601258", descricao: "Osteomielite de costela ou esterno - tratamento cirúrgico", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601088", descricao: "Plumbagem extrafascial", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601266", descricao: "Punção biópsia de costela ou esterno", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601096", descricao: "Reconstrução da parede torácica (com ou sem prótese)", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601100", descricao: "Reconstrução da parede torácica com retalhos cutâneos", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601118", descricao: "Reconstrução da parede torácica com retalhos musculares", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601126", descricao: "Reconstrução da região esternal com retalhos musculares", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601134", descricao: "Ressecção de tumor do diafragma e reconstrução", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601290", descricao: "Ressutura de parede torácica", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601142", descricao: "Retirada de corpo estranho da parede torácica", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601150", descricao: "Toracectomia", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601169", descricao: "Toracoplastia (qualquer técnica)", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601177", descricao: "Toracotomia com biópsia", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601185", descricao: "Toracotomia exploradora (excluídos os procedimentos", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601193", descricao: "Toracotomia para procedimentos ortopédicos sobre a", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601207", descricao: "Tração esquelética do gradil costo-esternal (traumatismo)", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601215", descricao: "Tratamento cirúrgico de fraturas do gradil costal", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30601282", descricao: "Vídeo para procedimentos sobre a coluna vertebral", secao: "Parede Torácica (3.06.01.00-2)" },
  { codigo: "30602017", descricao: "Biópsia incisional de mama", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602335", descricao: "Biópsia percutânea com agulha grossa, em consultório", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602033", descricao: "Correção cirúrgica da assimetria mamária", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602041", descricao: "Correção de inversão papilar - unilateral", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602050", descricao: "Drenagem de abscesso de mama", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602068", descricao: "Drenagem e/ou aspiração de seroma", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602076", descricao: "Exérese de lesão da mama por marcação estereotáxica", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602084", descricao: "Exérese de mama supra-numerária - unilateral", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602092", descricao: "Exérese de nódulo", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602106", descricao: "Fistulectomia de mama", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602114", descricao: "Ginecomastia - unilateral", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602130", descricao: "Linfadenectomia axilar", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602343", descricao: "Linfadenectomia por incisão extra-axilar", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602157", descricao: "Mastectomia simples", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602165", descricao: "Mastectomia subcutânea e inclusão da prótese", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602173", descricao: "Mastoplastia em mama oposta após reconstrução da", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602203", descricao: "Quadrantectomia - ressecção segmentar", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602190", descricao: "Quadrantectomia e linfadenectomia axilar", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602262", descricao: "Reconstrução da mama com prótese e/ou expansor", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602211", descricao: "Reconstrução da placa aréolo mamilar - unilateral", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602238", descricao: "Reconstrução mamária com retalho muscular ou", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602246", descricao: "Reconstrução mamária com retalhos cutâneos regionais", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602254", descricao: "Reconstrução parcial da mama pós-quadrantectomia", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602289", descricao: "Ressecção do linfonodo sentinela / torácica lateral", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602297", descricao: "Ressecção do linfonodo sentinela / torácica medial", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602300", descricao: "Ressecção dos ductos principais da mama - unilateral", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602319", descricao: "Retirada da válvula após colocação de", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30602327", descricao: "Substituição de prótese", secao: "Mamas (3.06.02.00-9)" },
  { codigo: "30701015", descricao: "Abdominal ou hipogástrico", secao: "Transplantes Cutâneos (Com Microanastomoses Vasculares) (3.07.01.00-7)" },
  { codigo: "30701023", descricao: "Antebraço", secao: "Transplantes Cutâneos (Com Microanastomoses Vasculares) (3.07.01.00-7)" },
  { codigo: "30701031", descricao: "Axilar", secao: "Transplantes Cutâneos (Com Microanastomoses Vasculares) (3.07.01.00-7)" },
  { codigo: "30701040", descricao: "Couro cabeludo", secao: "Transplantes Cutâneos (Com Microanastomoses Vasculares) (3.07.01.00-7)" },
  { codigo: "30701058", descricao: "Deltopeitoral", secao: "Transplantes Cutâneos (Com Microanastomoses Vasculares) (3.07.01.00-7)" },
  { codigo: "30701066", descricao: "Digitais (da face volar e látero-cubital dos dedos médio e", secao: "Transplantes Cutâneos (Com Microanastomoses Vasculares) (3.07.01.00-7)" },
  { codigo: "30701074", descricao: "Digital do hallux", secao: "Transplantes Cutâneos (Com Microanastomoses Vasculares) (3.07.01.00-7)" },
  { codigo: "30701082", descricao: "Dorsal do pé", secao: "Transplantes Cutâneos (Com Microanastomoses Vasculares) (3.07.01.00-7)" },
  { codigo: "30701090", descricao: "Escapular", secao: "Transplantes Cutâneos (Com Microanastomoses Vasculares) (3.07.01.00-7)" },
  { codigo: "30701104", descricao: "Femoral", secao: "Transplantes Cutâneos (Com Microanastomoses Vasculares) (3.07.01.00-7)" },
  { codigo: "30701112", descricao: "Fossa poplítea", secao: "Transplantes Cutâneos (Com Microanastomoses Vasculares) (3.07.01.00-7)" },
  { codigo: "30701120", descricao: "Inguino-cural", secao: "Transplantes Cutâneos (Com Microanastomoses Vasculares) (3.07.01.00-7)" },
  { codigo: "30701139", descricao: "Intercostal", secao: "Transplantes Cutâneos (Com Microanastomoses Vasculares) (3.07.01.00-7)" },
  { codigo: "30701147", descricao: "Interdigital da 1a comissura dos dedos do pé", secao: "Transplantes Cutâneos (Com Microanastomoses Vasculares) (3.07.01.00-7)" },
  { codigo: "30701155", descricao: "Outros transplantes cutâneos", secao: "Transplantes Cutâneos (Com Microanastomoses Vasculares) (3.07.01.00-7)" },
  { codigo: "30701163", descricao: "Paraescapular", secao: "Transplantes Cutâneos (Com Microanastomoses Vasculares) (3.07.01.00-7)" },
  { codigo: "30701171", descricao: "Retroauricular", secao: "Transplantes Cutâneos (Com Microanastomoses Vasculares) (3.07.01.00-7)" },
  { codigo: "30701180", descricao: "Temporal", secao: "Transplantes Cutâneos (Com Microanastomoses Vasculares) (3.07.01.00-7)" },
  { codigo: "30701198", descricao: "Transplante cutâneo com microanastomose", secao: "Transplantes Cutâneos (Com Microanastomoses Vasculares) (3.07.01.00-7)" },
  { codigo: "30702011", descricao: "Grande dorsal (latissimus dorsi)", secao: "Transplantes Músculo-Cutâneos (Com Microanastomoses Vasculares) (3.07.02.00-3)" },
  { codigo: "30702020", descricao: "Grande glúteo (gluteus maximus)", secao: "Transplantes Músculo-Cutâneos (Com Microanastomoses Vasculares) (3.07.02.00-3)" },
  { codigo: "30702038", descricao: "Outros transplantes músculo-cutâneos", secao: "Transplantes Músculo-Cutâneos (Com Microanastomoses Vasculares) (3.07.02.00-3)" },
  { codigo: "30702046", descricao: "Reto abdominal (rectus abdominis)", secao: "Transplantes Músculo-Cutâneos (Com Microanastomoses Vasculares) (3.07.02.00-3)" },
  { codigo: "30702054", descricao: "Reto interno (gracilis)", secao: "Transplantes Músculo-Cutâneos (Com Microanastomoses Vasculares) (3.07.02.00-3)" },
  { codigo: "30702062", descricao: "Serrato maior (serratus)", secao: "Transplantes Músculo-Cutâneos (Com Microanastomoses Vasculares) (3.07.02.00-3)" },
  { codigo: "30702070", descricao: "Tensor da fascia lata (tensor fascia lata)", secao: "Transplantes Músculo-Cutâneos (Com Microanastomoses Vasculares) (3.07.02.00-3)" },
  { codigo: "30701201", descricao: "Transplante cutâneo sem microanastomose, ilha", secao: "Transplantes Músculo-Cutâneos (Com Microanastomoses Vasculares) (3.07.02.00-3)" },
  { codigo: "30701210", descricao: "Transplante miocutâneo com microanastomose", secao: "Transplantes Músculo-Cutâneos (Com Microanastomoses Vasculares) (3.07.02.00-3)" },
  { codigo: "30702089", descricao: "Trapézio (trapezius)", secao: "Transplantes Músculo-Cutâneos (Com Microanastomoses Vasculares) (3.07.02.00-3)" },
  { codigo: "30703018", descricao: "Bíceps femoral (biceps femoris)", secao: "Transplantes Musculares (Com Microanastomoses Vasculares) (3.07.03.00-0)" },
  { codigo: "30703026", descricao: "Extensor comum dos dedos (extensor digitorum longus)", secao: "Transplantes Musculares (Com Microanastomoses Vasculares) (3.07.03.00-0)" },
  { codigo: "30703034", descricao: "Extensor próprio do dedo gordo (extensor hallucis longus)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30703050", descricao: "Grande dorsal (latissimus dorsi)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30703069", descricao: "Grande peitoral (pectoralis major)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30703077", descricao: "Músculo pédio (extensor digitorum brevis)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30703085", descricao: "Os músculos latissimus dorsi, gracilis, rectus femoris, tensor", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30703093", descricao: "Outros transplantes musculares", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30703107", descricao: "Primeiro radial externo (extensor carpi radialis longus)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30703115", descricao: "Reto anterior (rectus femoris)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30703123", descricao: "Reto interno (gracilis)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30703131", descricao: "Sartório (sartorius)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30703140", descricao: "Semimembranoso (semimembranosus)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30703158", descricao: "Semitendinoso (semitendinosus)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30703166", descricao: "Serrato maior (serratus)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30703174", descricao: "Supinador longo (brachioradialis)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30703182", descricao: "Tensor da fascia lata (tensor fascia lata)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30704014", descricao: "Costela", secao: "Vascularizados (Com Microanastomoses Vasculares) (3.07.04.00-6)" },
  { codigo: "30704022", descricao: "Ilíaco", secao: "Vascularizados (Com Microanastomoses Vasculares) (3.07.04.00-6)" },
  { codigo: "30704030", descricao: "Osteocutâneo de ilíaco", secao: "Vascularizados (Com Microanastomoses Vasculares) (3.07.04.00-6)" },
  { codigo: "30704049", descricao: "Osteocutâneos de costela", secao: "Vascularizados (Com Microanastomoses Vasculares) (3.07.04.00-6)" },
  { codigo: "30704057", descricao: "Osteomusculocutâneo de costela", secao: "Vascularizados (Com Microanastomoses Vasculares) (3.07.04.00-6)" },
  { codigo: "30704065", descricao: "Outros transplantes ósseos e osteomusculocutâneos", secao: "Vascularizados (Com Microanastomoses Vasculares) (3.07.04.00-6)" },
  { codigo: "30704073", descricao: "Perônio ou fíbula", secao: "Vascularizados (Com Microanastomoses Vasculares) (3.07.04.00-6)" },
  { codigo: "30704081", descricao: "Transplante ósseo vascularizado (microanastomose)", secao: "Vascularizados (Com Microanastomoses Vasculares) (3.07.04.00-6)" },
  { codigo: "30705010", descricao: "Autotransplante de dois retalhos musculares", secao: "Vasculares) (3.07.05.00-2)" },
  { codigo: "30705029", descricao: "Autotransplante de dois retalhos cutâneos combinados,", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30705037", descricao: "Autotransplante de dois retalhos, um cutâneo combinado", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30705045", descricao: "Autotransplante de dois retalhos, um cutâneo combinado a", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30705053", descricao: "Autotransplante de epiplon", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30705061", descricao: "Autotransplante de outros retalhos, isolados entre si,", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30705070", descricao: "Autotransplante de três retalhos, um cutâneo separado,", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30705100", descricao: "Reimplante de segmentos distais do membro superior,", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30706017", descricao: "Reimplante do membro inferior do nível médio", secao: "Reimplantes E Revascularizações Dos Membros (3.07.06.00-9)" },
  { codigo: "30706025", descricao: "Reimplante do membro inferior do pé até o terço", secao: "Reimplantes E Revascularizações Dos Membros (3.07.06.00-9)" },
  { codigo: "30706033", descricao: "Reimplante do membro superior, do nível médio do", secao: "Reimplantes E Revascularizações Dos Membros (3.07.06.00-9)" },
  { codigo: "30707013", descricao: "Transplante articular de metatarsofalângica para a mão", secao: "Reimplantes E Revascularizações Dos Membros (3.07.06.00-9)" },
  { codigo: "30707021", descricao: "Transplante de 2º pododáctilo para mão", secao: "Reimplantes E Revascularizações Dos Membros (3.07.06.00-9)" },
  { codigo: "30707030", descricao: "Transplante de dedos do pé para a mão", secao: "Reimplantes E Revascularizações Dos Membros (3.07.06.00-9)" },
  { codigo: "30707064", descricao: "Transplante de dois pododáctilos para a mão", secao: "Reimplantes E Revascularizações Dos Membros (3.07.06.00-9)" },
  { codigo: "30707048", descricao: "Transplante do 2º pododáctilo para o polegar", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30707056", descricao: "Transplante do hallux para polegar", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30709016", descricao: "Instalação de halo craniano", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30709024", descricao: "Tração cutânea", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30709032", descricao: "Tração transesquelética (por membro)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30710014", descricao: "Fios ou pinos metálicos transósseos", secao: "Retirada De Material De Síntese (3.07.10.00-6)" },
  { codigo: "30710022", descricao: "Fios, pinos, parafusos ou hastes metálicas intra-ósseas", secao: "Retirada De Material De Síntese (3.07.10.00-6)" },
  { codigo: "30710030", descricao: "Placas", secao: "Retirada De Material De Síntese (3.07.10.00-6)" },
  { codigo: "30710049", descricao: "Próteses de substituição de pequenas articulações", secao: "Retirada De Material De Síntese (3.07.10.00-6)" },
  { codigo: "30711010", descricao: "Imobilizações não-gessadas (qualquer segmento)", secao: "Imobilizações Provisórias - Talas Gessadas (3.07.11.00-2)" },
  { codigo: "30711029", descricao: "Membro inferior", secao: "Imobilizações Provisórias - Talas Gessadas (3.07.11.00-2)" },
  { codigo: "30711037", descricao: "Membro superior", secao: "Imobilizações Provisórias - Talas Gessadas (3.07.11.00-2)" },
  { codigo: "30712017", descricao: "Áxilo-palmar ou pendente", secao: "Aparelhos Gessados (3.07.12.00-9)" },
  { codigo: "30712025", descricao: "Bota com ou sem salto", secao: "Aparelhos Gessados (3.07.12.00-9)" },
  { codigo: "30712033", descricao: "Colar", secao: "Aparelhos Gessados (3.07.12.00-9)" },
  { codigo: "30712041", descricao: "Colete", secao: "Aparelhos Gessados (3.07.12.00-9)" },
  { codigo: "30712050", descricao: "Cruro-podálico", secao: "Aparelhos Gessados (3.07.12.00-9)" },
  { codigo: "30712068", descricao: "Dupla abdução ou Ducroquet", secao: "Aparelhos Gessados (3.07.12.00-9)" },
  { codigo: "30712076", descricao: "Halo-gesso", secao: "Aparelhos Gessados (3.07.12.00-9)" },
  { codigo: "30712084", descricao: "Inguino-maleolar", secao: "Aparelhos Gessados (3.07.12.00-9)" },
  { codigo: "30712106", descricao: "Minerva ou Risser para escoliose", secao: "Aparelhos Gessados (3.07.12.00-9)" },
  { codigo: "30712114", descricao: "Pelvipodálico", secao: "Aparelhos Gessados (3.07.12.00-9)" },
  { codigo: "30712122", descricao: "Spica-gessada", secao: "Aparelhos Gessados (3.07.12.00-9)" },
  { codigo: "30712130", descricao: "Tipo Velpeau", secao: "Aparelhos Gessados (3.07.12.00-9)" },
  { codigo: "30712149", descricao: "Tóraco-braquial", secao: "Aparelhos Gessados (3.07.12.00-9)" },
  { codigo: "30713153", descricao: "Artroscopia para diagnóstico com ou sem biópsia sinovial", secao: "Outros Procedimentos / Punções (3.07.13.00-5)" },
  { codigo: "30713021", descricao: "Biópsia óssea", secao: "Outros Procedimentos / Punções (3.07.13.00-5)" },
  { codigo: "30713030", descricao: "Biópsias percutânea sinovial ou de tecidos moles", secao: "Outros Procedimentos / Punções (3.07.13.00-5)" },
  { codigo: "30713048", descricao: "Enxertos em outras pseudartroses", secao: "Outros Procedimentos / Punções (3.07.13.00-5)" },
  { codigo: "30713064", descricao: "Manipulação articular sob anestesia geral", secao: "Outros Procedimentos / Punções (3.07.13.00-5)" },
  { codigo: "30713145", descricao: "Punção extra-articular diagnóstica ou terapêutica", secao: "Outros Procedimentos / Punções (3.07.13.00-5)" },
  { codigo: "30713072", descricao: "Retirada de enxerto ósseo", secao: "Outros Procedimentos / Punções (3.07.13.00-5)" },
  { codigo: "30714010", descricao: "Corpo estranho intra-articular - tratamento cirúrgico", secao: "Retirada De Corpo Estranho (3.07.14.00-1)" },
  { codigo: "30714036", descricao: "Corpo estranho intramuscular - tratamento cirúrgico", secao: "Retirada De Corpo Estranho (3.07.14.00-1)" },
  { codigo: "30714028", descricao: "Corpo estranho intra-ósseo - tratamento cirúrgico", secao: "Retirada De Corpo Estranho (3.07.14.00-1)" },
  { codigo: "30715016", descricao: "Artrodese da coluna com instrumentação por segmento", secao: "Coluna Vertebral (3.07.15.00-8)" },
  { codigo: "30715024", descricao: "Artrodese de coluna via anterior ou póstero lateral -", secao: "Coluna Vertebral (3.07.15.00-8)" },
  { codigo: "30715032", descricao: "Biópsia da coluna", secao: "Coluna Vertebral (3.07.15.00-8)" },
  { codigo: "30715040", descricao: "Biópsia de corpo vertebral com agulha", secao: "Coluna Vertebral (3.07.15.00-8)" },
  { codigo: "30715059", descricao: "Cirurgia de coluna por via endoscópica", secao: "Coluna Vertebral (3.07.15.00-8)" },
  { codigo: "30715067", descricao: "Cordotomia - mielotomia", secao: "Coluna Vertebral (3.07.15.00-8)" },
  { codigo: "30715075", descricao: "Costela cervical - tratamento cirúrgico", secao: "Coluna Vertebral (3.07.15.00-8)" },
  { codigo: "30715083", descricao: "Derivação lombar externa", secao: "Coluna Vertebral (3.07.15.00-8)" },
  { codigo: "30715091", descricao: "Descompressão medular e/ou cauda equina", secao: "Coluna Vertebral (3.07.15.00-8)" },
  { codigo: "30715105", descricao: "Dorso curvo / escoliose / giba costal - tratamento cirúrgico", secao: "Coluna Vertebral (3.07.15.00-8)" },
  { codigo: "30715113", descricao: "Espondilolistese - tratamento cirúrgico", secao: "Coluna Vertebral (3.07.15.00-8)" },
  { codigo: "30715121", descricao: "Fratura de coluna - tratamento conservador", secao: "Coluna Vertebral (3.07.15.00-8)" },
  { codigo: "30715130", descricao: "Fratura do cóccix - redução incruenta", secao: "Coluna Vertebral (3.07.15.00-8)" },
  { codigo: "30715148", descricao: "Fratura do cóccix - tratamento cirúrgico", secao: "Coluna Vertebral (3.07.15.00-8)" },
  { codigo: "30715156", descricao: "Fratura e/ou luxação de coluna vertebral -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30715164", descricao: "Fraturas ou fratura-luxação de coluna -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30715172", descricao: "Hemivértebra - ressecção via anterior ou posterior -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30715393", descricao: "Hérnia de disco cervical - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30715180", descricao: "Hérnia de disco tóraco-lombar - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30715199", descricao: "Laminectomia ou laminotomia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30715210", descricao: "Osteomielite de coluna - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30715229", descricao: "Osteotomia de coluna vertebral - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30715237", descricao: "Outras afecções da coluna - tratamento incruento", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30715245", descricao: "Pseudartrose de coluna - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30715253", descricao: "Punção liquórica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30715261", descricao: "Retirada de corpo estranho - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30715270", descricao: "Retirada de material de síntese - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30715288", descricao: "Substituição de corpo vertebral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30715296", descricao: "Tração cervical transesquelética", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30715300", descricao: "Tratamento cirúrgico da cifose infantil", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30715318", descricao: "Tratamento cirúrgico da lesão traumática raquimedular", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30715326", descricao: "Tratamento cirúrgico das malformações craniovertebrais", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30715342", descricao: "Tratamento conservador do traumatismo raquimedular", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30715350", descricao: "Tratamento microcirúrgico das lesões intramedulares", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30715369", descricao: "Tratamento microcirúrgico do canal vertebral estreito por", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30715385", descricao: "Tumor ósseo vertebral - ressecção com substituição com ou", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30717019", descricao: "Artrodese ao nível do ombro - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30717027", descricao: "Artroplastia escápulo umeral com implante - tratamento", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30717035", descricao: "Artrotomia glenoumeral - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30717043", descricao: "Biópsia cirúrgica da cintura escapular", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30717051", descricao: "Deformidade (doença) Sprengel - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30717060", descricao: "Desarticulação ao nível do ombro - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30717078", descricao: "Escápula em ressalto - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30717086", descricao: "Fratura de cintura escapular - tratamento conservador", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30717094", descricao: "Fraturas e/ou luxações e/ou avulsões - redução incruenta", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30717108", descricao: "Fraturas e/ou luxações e/ou avulsões -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30717116", descricao: "Luxações crônicas inveteradas e recidivantes -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30717124", descricao: "Osteomielite ao nível da cintura escapular - tratamento", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30717132", descricao: "Pseudartroses e/ou osteotomias da cintura escapular -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30717140", descricao: "Ressecção parcial ou total de clavícula -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30717159", descricao: "Revisão cirúrgica de prótese de ombro", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30717167", descricao: "Transferências musculares ao nível do ombro -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30718015", descricao: "Amputação ao nível do braço - tratamento cirúrgico", secao: "Braço (3.07.18.00-7)" },
  { codigo: "30718023", descricao: "Biópsia cirúrgica do úmero", secao: "Braço (3.07.18.00-7)" },
  { codigo: "30718031", descricao: "Fixador externo dinâmico com ou sem alongamento -", secao: "Braço (3.07.18.00-7)" },
  { codigo: "30718066", descricao: "Fratura de úmero - tratamento conservador", secao: "Braço (3.07.18.00-7)" },
  { codigo: "30718082", descricao: "Osteomielite de úmero - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30718090", descricao: "Pseudartroses, osteotomias, alongamentos/encurtamentos -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30719011", descricao: "Artrodese - tratamento cirúrgico", secao: "Cotovelo (3.07.19.00-3)" },
  { codigo: "30719020", descricao: "Artroplastia com implante - tratamento cirúrgico", secao: "Cotovelo (3.07.19.00-3)" },
  { codigo: "30719038", descricao: "Artroplastias sem implante - tratamento cirúrgico", secao: "Cotovelo (3.07.19.00-3)" },
  { codigo: "30719046", descricao: "Artrotomia de cotovelo - tratamento cirúrgico", secao: "Cotovelo (3.07.19.00-3)" },
  { codigo: "30719054", descricao: "Biópsia cirúrgica de cotovelo", secao: "Cotovelo (3.07.19.00-3)" },
  { codigo: "30719062", descricao: "Desarticulação ao nível do cotovelo - tratamento cirúrgico", secao: "Cotovelo (3.07.19.00-3)" },
  { codigo: "30719070", descricao: "Fratura de cotovelo - tratamento conservador", secao: "Cotovelo (3.07.19.00-3)" },
  { codigo: "30719097", descricao: "Fraturas e/ou luxações - redução incruenta", secao: "Cotovelo (3.07.19.00-3)" },
  { codigo: "30719100", descricao: "Fraturas e/ou luxações - tratamento cirúrgico", secao: "Cotovelo (3.07.19.00-3)" },
  { codigo: "30719119", descricao: "Lesões ligamentares - redução incruenta", secao: "Cotovelo (3.07.19.00-3)" },
  { codigo: "30719127", descricao: "Tendinites, sinovites e artrites - tratamento cirúrgico", secao: "Cotovelo (3.07.19.00-3)" },
  { codigo: "30720010", descricao: "Abaixamento miotendinoso no antebraço", secao: "Antebraço (3.07.20.00-1)" },
  { codigo: "30720036", descricao: "Amputação ao nível do antebraço - tratamento cirúrgico", secao: "Antebraço (3.07.20.00-1)" },
  { codigo: "30720044", descricao: "Biópsia cirúrgica do antebraço", secao: "Antebraço (3.07.20.00-1)" },
  { codigo: "30720052", descricao: "Contratura isquêmica de Volkmann - tratamento cirúrgico", secao: "Antebraço (3.07.20.00-1)" },
  { codigo: "30720060", descricao: "Correção de deformidade adquirida de antebraço com", secao: "Antebraço (3.07.20.00-1)" },
  { codigo: "30720079", descricao: "Encurtamento segmentar dos ossos do antebraço com", secao: "Antebraço (3.07.20.00-1)" },
  { codigo: "30720087", descricao: "Fratura do antebraço - tratamento conservador", secao: "Antebraço (3.07.20.00-1)" },
  { codigo: "30720117", descricao: "Fratura viciosamente consolidada de antebraço -", secao: "Antebraço (3.07.20.00-1)" },
  { codigo: "30720125", descricao: "Osteomielite dos ossos do antebraço -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30720133", descricao: "Pseudartroses e ou osteotomias - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30720141", descricao: "Ressecção da cabeça do rádio e/ou da extremidade", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30720150", descricao: "Ressecção do processo estilóide do rádio -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30720168", descricao: "Sinostose rádio-ulnar - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30721016", descricao: "Agenesia de rádio (centralização da ulna no carpo)", secao: "Punho (3.07.21.00-8)" },
  { codigo: "30721024", descricao: "Alongamento do rádio/ulna - tratamento cirúrgico", secao: "Punho (3.07.21.00-8)" },
  { codigo: "30721032", descricao: "Artrodese entre os ossos do carpo", secao: "Punho (3.07.21.00-8)" },
  { codigo: "30721059", descricao: "Artrodese rádio-cárpica ou do punho", secao: "Punho (3.07.21.00-8)" },
  { codigo: "30721067", descricao: "Artroplastia do punho (com implante) - tratamento cirúrgico", secao: "Punho (3.07.21.00-8)" },
  { codigo: "30721075", descricao: "Artroplastia para ossos do carpo (com implante) -", secao: "Punho (3.07.21.00-8)" },
  { codigo: "30721083", descricao: "Artrotomia - tratamento cirúrgico", secao: "Punho (3.07.21.00-8)" },
  { codigo: "30721091", descricao: "Biópsia cirúrgica de punho", secao: "Punho (3.07.21.00-8)" },
  { codigo: "30721105", descricao: "Coto de amputação punho e antebraço - revisão", secao: "Punho (3.07.21.00-8)" },
  { codigo: "30721113", descricao: "Desarticulação do punho - tratamento cirúrgico", secao: "Punho (3.07.21.00-8)" },
  { codigo: "30721121", descricao: "Encurtamento rádio/ulnar", secao: "Punho (3.07.21.00-8)" },
  { codigo: "30721148", descricao: "Fratura de osso do carpo - redução cirúrgica", secao: "Punho (3.07.21.00-8)" },
  { codigo: "30721130", descricao: "Fratura de punho - tratamento conservador", secao: "Punho (3.07.21.00-8)" },
  { codigo: "30721156", descricao: "Fratura do carpo - redução incruenta", secao: "Punho (3.07.21.00-8)" },
  { codigo: "30721172", descricao: "Fraturas do carpo - tratamento conservador", secao: "Punho (3.07.21.00-8)" },
  { codigo: "30721180", descricao: "Fraturas e/ou luxações do punho - redução incruenta", secao: "Punho (3.07.21.00-8)" },
  { codigo: "30721199", descricao: "Fraturas e/ou luxações do punho - tratamento cirúrgico", secao: "Punho (3.07.21.00-8)" },
  { codigo: "30721202", descricao: "Luxação do carpo - redução incruenta", secao: "Punho (3.07.21.00-8)" },
  { codigo: "30721210", descricao: "Pseudartroses - tratamento cirúrgico", secao: "Punho (3.07.21.00-8)" },
  { codigo: "30721237", descricao: "Reparação ligamentar do carpo", secao: "Punho (3.07.21.00-8)" },
  { codigo: "30721229", descricao: "Ressecção de osso do carpo - tratamento cirúrgico", secao: "Punho (3.07.21.00-8)" },
  { codigo: "30721245", descricao: "Sinovectomia de punho - tratamento cirúrgico", secao: "Punho (3.07.21.00-8)" },
  { codigo: "30721253", descricao: "Transposição do rádio para ulna", secao: "Punho (3.07.21.00-8)" },
  { codigo: "30722012", descricao: "Abscesso de mão e dedos - tenossinovites / espaços", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722039", descricao: "Abscessos de dedo (drenagem) - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722055", descricao: "Alongamentos tendinosos de mão", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722063", descricao: "Amputação ao nível dos metacarpianos -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722071", descricao: "Amputação de dedo (cada) - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722080", descricao: "Amputação transmetacarpiana", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722098", descricao: "Amputação transmetacarpiana com transposição de dedo", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722101", descricao: "Aponevrose palmar (ressecção) - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722110", descricao: "Artrodese interfalangeana / metacarpofalangeana -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722128", descricao: "Artroplastia com implante na mão (MF e IF) múltipla", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722136", descricao: "Artroplastia com implante na mão (MF ou IF)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722144", descricao: "Artroplastia interfalangeana / metacarpofalangeana -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722152", descricao: "Artrotomia ao nível da mão - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722160", descricao: "Biópsia cirúrgica dos ossos da mão", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722179", descricao: "Bridas congênitas - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722209", descricao: "Capsulectomias múltiplas MF ou IF", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722217", descricao: "Capsulectomias única MF e IF", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722225", descricao: "Centralização da ulna (tratamento da mão torta radial)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722233", descricao: "Contratura isquêmica de mão - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722241", descricao: "Coto de amputação digital - revisão", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722250", descricao: "Dedo colo de cisne - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722268", descricao: "Dedo em botoeira - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722276", descricao: "Dedo em gatilho, capsulotomia / fasciotomia -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722284", descricao: "Dedo em martelo - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722292", descricao: "Dedo em martelo - tratamento conservador", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722306", descricao: "Enxerto ósseo (perda de substância) - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722314", descricao: "Exploração cirúrgica de tendão de mão", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722322", descricao: "Falangização", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722330", descricao: "Fixador externo em cirurgia da mão", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722357", descricao: "Fratura de Bennett - redução incruenta", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722365", descricao: "Fratura de Bennett - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722349", descricao: "Fratura de falange - tratamento conservador", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722373", descricao: "Fratura de osso da mão - tratamento conservador", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722381", descricao: "Fratura do metacarpiano - tratamento conservador", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722403", descricao: "Fraturas de falanges ou metacarpianos -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722411", descricao: "Fraturas de falanges ou metacarpianos - tratamento", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722420", descricao: "Fraturas e/ou luxações de falanges (interfalangeanas) -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722438", descricao: "Fraturas e/ou luxações de falanges (interfalangeanas) -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722446", descricao: "Fraturas e/ou luxações de metacarpianos -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722454", descricao: "Gigantismo ao nível da mão - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722462", descricao: "Lesões ligamentares agudas da mão - reparação cirúrgica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722470", descricao: "Lesões ligamentares crônicas da mão - reparação cirúrgica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722489", descricao: "Ligamentoplastia com âncora", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722497", descricao: "Luxação metacarpofalangeana - redução incruenta", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722500", descricao: "Luxação metacarpofalangeana - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722519", descricao: "Osteomielite ao nível da mão - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722527", descricao: "Osteossíntese de fratura de falange e metacarpeana com", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722535", descricao: "Osteossíntese de fratura de falange e metacarpeana com", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722543", descricao: "Perda de substância da mão (reparação) -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722551", descricao: "Plástica ungueal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722560", descricao: "Policização ou transferência digital", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722578", descricao: "Polidactilia articulada - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722586", descricao: "Polidactilia não articulada - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722594", descricao: "Prótese (implante) para ossos do carpo", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722608", descricao: "Pseudartrose com perda de substâncias de metacarpiano", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722616", descricao: "Pseudartrose do escafóide - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722624", descricao: "Pseudartrose dos ossos da mão - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722632", descricao: "Reconstrução da falange com retalho homodigital", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722640", descricao: "Reconstrução de leito ungueal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722659", descricao: "Reconstrução do polegar com retalho ilhado osteocutâneo", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722667", descricao: "Reimplante de dois dedos da mão (por cada dedo adicional", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722675", descricao: "Reimplante do membro superior nível transmetacarpiano", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722683", descricao: "Reimplante do polegar", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722691", descricao: "Reparações cutâneas com retalho ilhado antebraquial", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722713", descricao: "Ressecção de cisto sinovial", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722721", descricao: "Retração cicatricial de mais de um dedo, sem", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722730", descricao: "Retração cicatricial de um dedo sem comprometimento", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722748", descricao: "Retração cicatricial dos dedos com lesão tendínea -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722756", descricao: "Revascularização do polegar ou outro dedo (por cada dedo", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722764", descricao: "Roturas do aparelho extensor de dedo - redução incruenta . 1C", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722772", descricao: "Roturas tendino-ligamentares da mão (mais que 1) -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722780", descricao: "Sequestrectomias", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722799", descricao: "Sindactilia de 2 dígitos - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722802", descricao: "Sindactilia múltipla - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722810", descricao: "Sinovectomia da mão (1 articulação)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722829", descricao: "Sinovectomia da mão (múltiplas)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722845", descricao: "Transposição de dedo - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722853", descricao: "Tratamento cirúrgico da polidactilia múltipla e/ou complexa", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722861", descricao: "Tratamento cirúrgico da sindactilia múltipla com emprego", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722870", descricao: "Tratamento da doença de Kiembuck com transplante", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30722888", descricao: "Tratamento da pseudoartrose do escafóide com transplante", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30723019", descricao: "Biópsia cirúrgica de cintura pélvica", secao: "Cintura Pélvica (3.07.23.00-0)" },
  { codigo: "30723027", descricao: "Desarticulação interílio abdominal - tratamento cirúrgico", secao: "Cintura Pélvica (3.07.23.00-0)" },
  { codigo: "30723035", descricao: "Fratura da cintura pélvica - tratamento conservador", secao: "Cintura Pélvica (3.07.23.00-0)" },
  { codigo: "30723060", descricao: "Fraturas e/ou luxações do anel pélvico - redução incruenta", secao: "Cintura Pélvica (3.07.23.00-0)" },
  { codigo: "30723051", descricao: "Fraturas e/ou luxações do anel pélvico (com uma ou mais", secao: "Cintura Pélvica (3.07.23.00-0)" },
  { codigo: "30723078", descricao: "Osteomielite ao nível da pelve - tratamento cirúrgico", secao: "Cintura Pélvica (3.07.23.00-0)" },
  { codigo: "30723086", descricao: "Osteotomias / artrodeses - tratamento cirúrgico", secao: "Cintura Pélvica (3.07.23.00-0)" },
  { codigo: "30724015", descricao: "Artrite séptica - tratamento cirúrgico", secao: "Cintura Pélvica (3.07.23.00-0)" },
  { codigo: "30724023", descricao: "Artrodese / fratura de acetábulo (ligamentotaxia) com", secao: "Cintura Pélvica (3.07.23.00-0)" },
  { codigo: "30724031", descricao: "Artrodese coxo-femoral em geral - tratamento cirúrgico", secao: "Cintura Pélvica (3.07.23.00-0)" },
  { codigo: "30724040", descricao: "Artrodiastase de quadril", secao: "Cintura Pélvica (3.07.23.00-0)" },
  { codigo: "30724058", descricao: "Artroplastia (qualquer técnica ou versão de quadril) -", secao: "Cintura Pélvica (3.07.23.00-0)" },
  { codigo: "30724066", descricao: "Artroplastia de quadril infectada (retirada dos", secao: "Cintura Pélvica (3.07.23.00-0)" },
  { codigo: "30724074", descricao: "Artroplastia de ressecção do quadril (Girdlestone) -", secao: "Cintura Pélvica (3.07.23.00-0)" },
  { codigo: "30724082", descricao: "Artroplastia parcial do quadril (tipo Thompson ou qualquer", secao: "Cintura Pélvica (3.07.23.00-0)" },
  { codigo: "30724104", descricao: "Artrotomia coxo-femoral - tratamento cirúrgico", secao: "Cintura Pélvica (3.07.23.00-0)" },
  { codigo: "30724090", descricao: "Artrotomia de quadril infectada (incisão e drenagem de artrite", secao: "Cintura Pélvica (3.07.23.00-0)" },
  { codigo: "30724112", descricao: "Biópsia cirúrgica coxo-femoral", secao: "Cintura Pélvica (3.07.23.00-0)" },
  { codigo: "30724120", descricao: "Desarticulação coxo-femoral - tratamento cirúrgico", secao: "Cintura Pélvica (3.07.23.00-0)" },
  { codigo: "30724163", descricao: "Fratura de acetábulo - redução incruenta", secao: "Cintura Pélvica (3.07.23.00-0)" },
  { codigo: "30724155", descricao: "Fratura de acetábulo (com uma ou mais abordagens) -", secao: "Cintura Pélvica (3.07.23.00-0)" },
  { codigo: "30724171", descricao: "Fratura e/ou luxação e/ou avulsão coxo-femoral -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30724180", descricao: "Fratura e/ou luxação e/ou avulsão coxo-femoral -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30724198", descricao: "Luxação congênita de quadril (redução cirúrgica e", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30724201", descricao: "Luxação congênita de quadril (redução cirúrgica simples) -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30724210", descricao: "Luxação congênita de quadril (redução incruenta com ou", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30724236", descricao: "Osteotomias ao nível do colo ou região trocanteriana", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30724244", descricao: "Osteotomias supra-acetabulares (Chiari, Pemberton, “dial”,", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30724252", descricao: "Punção-biópsia coxo-femoral-artrocentese", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30724279", descricao: "Revisão de artroplastias de quadril com retirada de", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30724287", descricao: "Tratamento de necrose avascular por foragem de", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30725011", descricao: "Alongamento / transporte ósseo / pseudoartrose com", secao: "Coxa / Fêmur (3.07.25.00-3)" },
  { codigo: "30725020", descricao: "Alongamento de fêmur - tratamento cirúrgico", secao: "Coxa / Fêmur (3.07.25.00-3)" },
  { codigo: "30725038", descricao: "Amputação ao nível da coxa - tratamento cirúrgico", secao: "Coxa / Fêmur (3.07.25.00-3)" },
  { codigo: "30725046", descricao: "Biópsia cirúrgica de fêmur", secao: "Coxa / Fêmur (3.07.25.00-3)" },
  { codigo: "30725054", descricao: "Correção de deformidade adquirida de fêmur com", secao: "Coxa / Fêmur (3.07.25.00-3)" },
  { codigo: "30725089", descricao: "Encurtamento de fêmur - tratamento cirúrgico", secao: "Coxa / Fêmur (3.07.25.00-3)" },
  { codigo: "30725100", descricao: "Fratura de fêmur - tratamento conservador", secao: "Coxa / Fêmur (3.07.25.00-3)" },
  { codigo: "30725119", descricao: "Fraturas de fêmur - redução incruenta", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30725127", descricao: "Fraturas de fêmur - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30725135", descricao: "Fraturas, pseudartroses, correção de deformidades e", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30725143", descricao: "Osteomielite de fêmur - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30725151", descricao: "Pseudartroses e/ou osteotomias - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30726018", descricao: "Artrite séptica - tratamento cirúrgico", secao: "Joelho (3.07.26.00-0)" },
  { codigo: "30726026", descricao: "Artrodese de joelho - tratamento cirúrgico", secao: "Joelho (3.07.26.00-0)" },
  { codigo: "30726034", descricao: "Artroplastia total de joelho com implantes -", secao: "Joelho (3.07.26.00-0)" },
  { codigo: "30726042", descricao: "Artrotomia - tratamento cirúrgico", secao: "Joelho (3.07.26.00-0)" },
  { codigo: "30726050", descricao: "Biópsia cirúrgica de joelho", secao: "Joelho (3.07.26.00-0)" },
  { codigo: "30726069", descricao: "Desarticulação de joelho - tratamento cirúrgico", secao: "Joelho (3.07.26.00-0)" },
  { codigo: "30726085", descricao: "Fratura de joelho - tratamento conservador", secao: "Joelho (3.07.26.00-0)" },
  { codigo: "30726107", descricao: "Fratura e/ou luxação de patela - tratamento cirúrgico", secao: "Joelho (3.07.26.00-0)" },
  { codigo: "30726093", descricao: "Fratura e/ou luxação de patela (inclusive osteocondral) -", secao: "Joelho (3.07.26.00-0)" },
  { codigo: "30726115", descricao: "Fraturas e/ou luxações ao nível do joelho -", secao: "Joelho (3.07.26.00-0)" },
  { codigo: "30726123", descricao: "Fraturas e/ou luxações ao nível do joelho -", secao: "Joelho (3.07.26.00-0)" },
  { codigo: "30726131", descricao: "Lesão aguda de ligamento colateral, associada a", secao: "Joelho (3.07.26.00-0)" },
  { codigo: "30726140", descricao: "Lesões agudas e/ou luxações de meniscos (1 ou ambos) -", secao: "Joelho (3.07.26.00-0)" },
  { codigo: "30726158", descricao: "Lesões complexas de joelho (fratura com lesão ligamentar", secao: "Joelho (3.07.26.00-0)" },
  { codigo: "30726166", descricao: "Lesões intrínsecas de joelho (lesões condrais,", secao: "Joelho (3.07.26.00-0)" },
  { codigo: "30726182", descricao: "Lesões ligamentares agudas - tratamento cirúrgico", secao: "Joelho (3.07.26.00-0)" },
  { codigo: "30726174", descricao: "Lesões ligamentares agudas - tratamento incruento", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30726190", descricao: "Lesões ligamentares periféricas crônicas -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30726204", descricao: "Liberação lateral e facectomias - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30726220", descricao: "Osteotomias ao nível do joelho - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30726239", descricao: "Realinhamentos do aparelho extensor - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30726247", descricao: "Reconstruções ligamentares do pivot central -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30726255", descricao: "Revisões de artroplastia total - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30726263", descricao: "Revisões de realinhamentos do aparelho extensor -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30726271", descricao: "Revisões de reconstruções intra-articulares -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30726298", descricao: "Transplantes homólogos ao nível do joelho -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30726301", descricao: "Tratamento cirúrgico de luxações / artrodese / contraturas", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30727014", descricao: "Alongamento / transporte ósseo / pseudoartrose", secao: "Perna (3.07.27.00-6)" },
  { codigo: "30727030", descricao: "Alongamento dos ossos da perna - tratamento cirúrgico", secao: "Perna (3.07.27.00-6)" },
  { codigo: "30727049", descricao: "Amputação de perna - tratamento cirúrgico", secao: "Perna (3.07.27.00-6)" },
  { codigo: "30727057", descricao: "Biópsia cirúrgica de tíbia ou fíbula", secao: "Perna (3.07.27.00-6)" },
  { codigo: "30727065", descricao: "Correção de deformidade adquirida de tíbia", secao: "Perna (3.07.27.00-6)" },
  { codigo: "30727073", descricao: "Correção de deformidades congênitas na perna", secao: "Perna (3.07.27.00-6)" },
  { codigo: "30727081", descricao: "Encurtamento dos ossos da perna - tratamento cirúrgico", secao: "Perna (3.07.27.00-6)" },
  { codigo: "30727103", descricao: "Fratura de osso da perna - tratamento conservador", secao: "Perna (3.07.27.00-6)" },
  { codigo: "30727138", descricao: "Fraturas de tíbia associada ou não a fíbula (inclui", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30727154", descricao: "Osteomielite dos ossos da perna - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30727162", descricao: "Osteotomias e/ou pseudartroses - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30727170", descricao: "Transposição de fíbula/tíbia - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30728010", descricao: "Amputação ao nível do tornozelo - tratamento cirúrgico", secao: "Tornozelo (3.07.28.00-2)" },
  { codigo: "30728029", descricao: "Artrite ou osteoartrite - tratamento cirúrgico", secao: "Tornozelo (3.07.28.00-2)" },
  { codigo: "30728037", descricao: "Artrodese (com ou sem alongamento simultâneo)", secao: "Tornozelo (3.07.28.00-2)" },
  { codigo: "30728045", descricao: "Artrodese ao nível do tornozelo - tratamento cirúrgico", secao: "Tornozelo (3.07.28.00-2)" },
  { codigo: "30728053", descricao: "Artroplastia de tornozelo (com implante) -", secao: "Tornozelo (3.07.28.00-2)" },
  { codigo: "30728061", descricao: "Artrorrise do tornozelo - tratamento cirúrgico", secao: "Tornozelo (3.07.28.00-2)" },
  { codigo: "30728070", descricao: "Artrotomia de tornozelo - tratamento cirúrgico", secao: "Tornozelo (3.07.28.00-2)" },
  { codigo: "30728088", descricao: "Biópsia cirúrgica do tornozelo", secao: "Tornozelo (3.07.28.00-2)" },
  { codigo: "30728096", descricao: "Fratura de tornozelo - tratamento conservador", secao: "Tornozelo (3.07.28.00-2)" },
  { codigo: "30728118", descricao: "Fraturas e/ou luxações ao nível do tornozelo -", secao: "Tornozelo (3.07.28.00-2)" },
  { codigo: "30728126", descricao: "Fraturas e/ou luxações ao nível do tornozelo -", secao: "Tornozelo (3.07.28.00-2)" },
  { codigo: "30728142", descricao: "Lesões ligamentares agudas ao nível do tornozelo -", secao: "Tornozelo (3.07.28.00-2)" },
  { codigo: "30728134", descricao: "Lesões ligamentares agudas ao nível do tornozelo -", secao: "Tornozelo (3.07.28.00-2)" },
  { codigo: "30728150", descricao: "Lesões ligamentares crônicas ao nível do tornozelo -", secao: "Tornozelo (3.07.28.00-2)" },
  { codigo: "30728169", descricao: "Osteocondrite de tornozelo - tratamento cirúrgico", secao: "Tornozelo (3.07.28.00-2)" },
  { codigo: "30728177", descricao: "Pseudartroses ou osteotomias - tratamento cirúrgico", secao: "Tornozelo (3.07.28.00-2)" },
  { codigo: "30729017", descricao: "Amputação ao nível do pé - tratamento cirúrgico", secao: "Pé (3.07.29.00-9)" },
  { codigo: "30729025", descricao: "Amputação/desarticulação de pododáctilos (por", secao: "Pé (3.07.29.00-9)" },
  { codigo: "30729033", descricao: "Artrite ou osteoartrite dos ossos do pé (inclui osteomielite) -", secao: "Pé (3.07.29.00-9)" },
  { codigo: "30729041", descricao: "Artrodese de tarso e/ou médio pé - tratamento cirúrgico", secao: "Pé (3.07.29.00-9)" },
  { codigo: "30729050", descricao: "Artrodese metatarso - falângica ou interfalângica -", secao: "Pé (3.07.29.00-9)" },
  { codigo: "30729068", descricao: "Biópsia cirúrgica dos ossos do pé", secao: "Pé (3.07.29.00-9)" },
  { codigo: "30729106", descricao: "Deformidade dos dedos - tratamento cirúrgico", secao: "Pé (3.07.29.00-9)" },
  { codigo: "30729114", descricao: "Exérese ungueal", secao: "Pé (3.07.29.00-9)" },
  { codigo: "30729122", descricao: "Fasciotomia ou ressecção de fascia plantar -", secao: "Pé (3.07.29.00-9)" },
  { codigo: "30729130", descricao: "Fratura de osso do pé - tratamento conservador", secao: "Pé (3.07.29.00-9)" },
  { codigo: "30729149", descricao: "Fratura e/ou luxações do pé (exceto antepé) -", secao: "Pé (3.07.29.00-9)" },
  { codigo: "30729157", descricao: "Fratura e/ou luxações do pé (exceto antepé) -", secao: "Pé (3.07.29.00-9)" },
  { codigo: "30729165", descricao: "Fraturas e/ou luxações do antepé - redução incruenta", secao: "Pé (3.07.29.00-9)" },
  { codigo: "30729173", descricao: "Fraturas e/ou luxações do antepé - tratamento cirúrgico", secao: "Pé (3.07.29.00-9)" },
  { codigo: "30729181", descricao: "Hallux valgus (um pé) - tratamento cirúrgico", secao: "Pé (3.07.29.00-9)" },
  { codigo: "30729190", descricao: "Osteotomia ou pseudartrose do tarso e médio pé -", secao: "Pé (3.07.29.00-9)" },
  { codigo: "30729203", descricao: "Osteotomia ou pseudartrose dos metatarsos/falanges -", secao: "Pé (3.07.29.00-9)" },
  { codigo: "30729220", descricao: "Pé plano/pé cavo/coalisão tarsal - tratamento cirúrgico", secao: "Pé (3.07.29.00-9)" },
  { codigo: "30729238", descricao: "Pé torto congênito (um pé) - tratamento cirúrgico", secao: "Pé (3.07.29.00-9)" },
  { codigo: "30729246", descricao: "Ressecção de osso do pé - tratamento cirúrgico", secao: "Pé (3.07.29.00-9)" },
  { codigo: "30729254", descricao: "Retração cicatricial dos dedos", secao: "Pé (3.07.29.00-9)" },
  { codigo: "30729270", descricao: "Rotura do tendão de Aquiles - tratamento cirúrgico", secao: "Pé (3.07.29.00-9)" },
  { codigo: "30729262", descricao: "Rotura do tendão de Aquiles - tratamento incruento", secao: "Pé (3.07.29.00-9)" },
  { codigo: "30729289", descricao: "Tratamento cirúrgico da sindactilia complexa e/ou múltipla", secao: "Pé (3.07.29.00-9)" },
  { codigo: "30729297", descricao: "Tratamento cirúrgico da sindactilia simples", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30729300", descricao: "Tratamento cirúrgico de gigantismo", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30729319", descricao: "Tratamento cirúrgico de linfedema ao nível do pé", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30729327", descricao: "Tratamento cirúrgico de polidactilia múltipla e/ou complexa", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30729335", descricao: "Tratamento cirúrgico de polidactilia simples", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30729343", descricao: "Tratamento cirúrgico do mal perfurante plantar", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30730015", descricao: "Alongamento", secao: "Músculos E Fascias (3.07.30.00-7)" },
  { codigo: "30730023", descricao: "Biópsia de músculo", secao: "Músculos E Fascias (3.07.30.00-7)" },
  { codigo: "30730031", descricao: "Desbridamento cirúrgico de feridas ou extremidades", secao: "Músculos E Fascias (3.07.30.00-7)" },
  { codigo: "30730040", descricao: "Desinserção ou miotomia", secao: "Músculos E Fascias (3.07.30.00-7)" },
  { codigo: "30730058", descricao: "Dissecção muscular", secao: "Músculos E Fascias (3.07.30.00-7)" },
  { codigo: "30730066", descricao: "Drenagem cirúrgica do psoas", secao: "Músculos E Fascias (3.07.30.00-7)" },
  { codigo: "30730074", descricao: "Fasciotomia", secao: "Músculos E Fascias (3.07.30.00-7)" },
  { codigo: "30730082", descricao: "Fasciotomia - por compartimento", secao: "Músculos E Fascias (3.07.30.00-7)" },
  { codigo: "30730090", descricao: "Fasciotomias (descompressivas)", secao: "Músculos E Fascias (3.07.30.00-7)" },
  { codigo: "30730104", descricao: "Fasciotomias acima do punho", secao: "Músculos E Fascias (3.07.30.00-7)" },
  { codigo: "30730120", descricao: "Terapia por ondas de choque extracorpórea em partes", secao: "Músculos E Fascias (3.07.30.00-7)" },
  { codigo: "30730139", descricao: "Terapia por ondas de choque extracorpórea em partes", secao: "Músculos E Fascias (3.07.30.00-7)" },
  { codigo: "30730155", descricao: "Transposição muscular", secao: "Músculos E Fascias (3.07.30.00-7)" },
  { codigo: "30731011", descricao: "Abertura de bainha tendinosa - tratamento cirúrgico", secao: "Músculos E Fascias (3.07.30.00-7)" },
  { codigo: "30731020", descricao: "Biópsias cirúrgicas de tendões, bursas e sinóvias", secao: "Músculos E Fascias (3.07.30.00-7)" },
  { codigo: "30731038", descricao: "Bursectomia - tratamento cirúrgico", secao: "Músculos E Fascias (3.07.30.00-7)" },
  { codigo: "30731046", descricao: "Cisto sinovial - tratamento cirúrgico", secao: "Músculos E Fascias (3.07.30.00-7)" },
  { codigo: "30731054", descricao: "Encurtamento de tendão - tratamento cirúrgico", secao: "Músculos E Fascias (3.07.30.00-7)" },
  { codigo: "30731062", descricao: "Sinovectomia - tratamento cirúrgico", secao: "Músculos E Fascias (3.07.30.00-7)" },
  { codigo: "30731070", descricao: "Tenoartroplastia para ossos do carpo", secao: "Músculos E Fascias (3.07.30.00-7)" },
  { codigo: "30731089", descricao: "Tenodese", secao: "Músculos E Fascias (3.07.30.00-7)" },
  { codigo: "30731100", descricao: "Tenólise/tendonese - tratamento cirúrgico", secao: "Músculos E Fascias (3.07.30.00-7)" },
  { codigo: "30731119", descricao: "Tenoplastia / enxerto de tendão - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30731127", descricao: "Tenoplastia de tendão em outras regiões", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30731178", descricao: "Tenossinovectomia de mão ou punho", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30731186", descricao: "Tenossinovites estenosantes - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30731194", descricao: "Tenossinovites infecciosas - drenagem", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30731208", descricao: "Tenotomia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30731216", descricao: "Transposição de mais de 1 tendão - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30731224", descricao: "Transposição única de tendão", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30731232", descricao: "Tumores de tendão ou sinovial - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30732018", descricao: "Curetagem ou ressecção em bloco de tumor com", secao: "Ossos (3.07.32.00-0)" },
  { codigo: "30732026", descricao: "Enxerto ósseo", secao: "Ossos (3.07.32.00-0)" },
  { codigo: "30732034", descricao: "Ressecção da lesão com cimentação e osteossíntese", secao: "Ossos (3.07.32.00-0)" },
  { codigo: "30732050", descricao: "Terapia por ondas de choque extracorpórea em partes", secao: "Ossos (3.07.32.00-0)" },
  { codigo: "30732069", descricao: "Terapia por ondas de choque extracorpórea em partes", secao: "Ossos (3.07.32.00-0)" },
  { codigo: "30732085", descricao: "Tumor ósseo (ressecção com substituição)", secao: "Ossos (3.07.32.00-0)" },
  { codigo: "30732093", descricao: "Tumor ósseo (ressecção e artrodese)", secao: "Ossos (3.07.32.00-0)" },
  { codigo: "30732107", descricao: "Tumor ósseo (ressecção e cimento)", secao: "Ossos (3.07.32.00-0)" },
  { codigo: "30732115", descricao: "Tumor ósseo (ressecção e enxerto)", secao: "Ossos (3.07.32.00-0)" },
  { codigo: "30732123", descricao: "Tumor ósseo (ressecção segmentar)", secao: "Ossos (3.07.32.00-0)" },
  { codigo: "30732131", descricao: "Tumor ósseo (ressecção simples)", secao: "Ossos (3.07.32.00-0)" },
  { codigo: "30733030", descricao: "Condroplastia (com remoção de corpos livres)", secao: "Procedimentos Videoartroscópicos De Joelho (3.07.33.00-6)" },
  { codigo: "30733081", descricao: "Fratura com redução e/ou estabilização da superfície", secao: "Procedimentos Videoartroscópicos De Joelho (3.07.33.00-6)" },
  { codigo: "30733103", descricao: "Instabilidade femoro-patelar, release lateral da patela,", secao: "Procedimentos Videoartroscópicos De Joelho (3.07.33.00-6)" },
  { codigo: "30733057", descricao: "Meniscectomia - um menisco", secao: "Procedimentos Videoartroscópicos De Joelho (3.07.33.00-6)" },
  { codigo: "30733049", descricao: "Osteocondroplastia - estabilização, ressecção e/ou", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30733073", descricao: "Reconstrução, retencionamento ou reforço do ligamento", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30733065", descricao: "Reparo ou sutura de um menisco", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30733022", descricao: "Sinovectomia parcial ou subtotal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30733014", descricao: "Sinovectomia total", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30734037", descricao: "Condroplastia (com remoção de corpos livres)", secao: "Procedimentos Videoartroscópicos De Tornozelo (3.07.34.00-2)" },
  { codigo: "30734061", descricao: "Fraturas - redução e estabilização de cada superfície", secao: "Procedimentos Videoartroscópicos De Tornozelo (3.07.34.00-2)" },
  { codigo: "30734045", descricao: "Osteocondroplastia - estabilização, ressecção e/ou", secao: "Procedimentos Videoartroscópicos De Tornozelo (3.07.34.00-2)" },
  { codigo: "30734053", descricao: "Reconstrução, retencionamento ou reforço de ligamento", secao: "Procedimentos Videoartroscópicos De Tornozelo (3.07.34.00-2)" },
  { codigo: "30734029", descricao: "Sinovectomia parcial ou subtotal", secao: "Procedimentos Videoartroscópicos De Tornozelo (3.07.34.00-2)" },
  { codigo: "30734010", descricao: "Sinovectomia total", secao: "Procedimentos Videoartroscópicos De Tornozelo (3.07.34.00-2)" },
  { codigo: "30735033", descricao: "Acromioplastia", secao: "Procedimentos Videoartroscópicos De Ombro (3.07.35.00-9)" },
  { codigo: "30735076", descricao: "Instabilidade multidirecional", secao: "Procedimentos Videoartroscópicos De Ombro (3.07.35.00-9)" },
  { codigo: "30735041", descricao: "Lesão labral", secao: "Procedimentos Videoartroscópicos De Ombro (3.07.35.00-9)" },
  { codigo: "30735050", descricao: "Luxação gleno-umeral", secao: "Procedimentos Videoartroscópicos De Ombro (3.07.35.00-9)" },
  { codigo: "30735084", descricao: "Ressecção lateral da clavícula", secao: "Procedimentos Videoartroscópicos De Ombro (3.07.35.00-9)" },
  { codigo: "30735068", descricao: "Ruptura do manguito rotador", secao: "Procedimentos Videoartroscópicos De Ombro (3.07.35.00-9)" },
  { codigo: "30735025", descricao: "Sinovectomia parcial ou subtotal", secao: "Procedimentos Videoartroscópicos De Ombro (3.07.35.00-9)" },
  { codigo: "30735017", descricao: "Sinovectomia total", secao: "Procedimentos Videoartroscópicos De Ombro (3.07.35.00-9)" },
  { codigo: "30735092", descricao: "Tenotomia da porção longa do bíceps", secao: "Procedimentos Videoartroscópicos De Ombro (3.07.35.00-9)" },
  { codigo: "30736030", descricao: "Condroplastia (com remoção de corpos livres)", secao: "Procedimentos Videoartroscópicos De Cotovelo (3.07.36.00-5)" },
  { codigo: "30736064", descricao: "Fraturas: redução e estabilização para cada superfície", secao: "Procedimentos Videoartroscópicos De Cotovelo (3.07.36.00-5)" },
  { codigo: "30736048", descricao: "Osteocondroplastia - estabilização, ressecção", secao: "Procedimentos Videoartroscópicos De Cotovelo (3.07.36.00-5)" },
  { codigo: "30736056", descricao: "Reconstrução, retencionamento ou reforço de ligamento # . 9C", secao: "Procedimentos Videoartroscópicos De Cotovelo (3.07.36.00-5)" },
  { codigo: "30736013", descricao: "Sinovectomia total", secao: "Procedimentos Videoartroscópicos De Cotovelo (3.07.36.00-5)" },
  { codigo: "30736021", descricao: "Sinovectomia parcial ou subtotal", secao: "Procedimentos Videoartroscópicos De Cotovelo (3.07.36.00-5)" },
  { codigo: "30737036", descricao: "Condroplastia (com remoção de corpos livres)", secao: "Procedimentos Videoartroscópicos De Punho E Túnel Do Carpo (3.07.37.00-1)" },
  { codigo: "30737060", descricao: "Fraturas - redução e estabilização de cada superfície", secao: "Procedimentos Videoartroscópicos De Punho E Túnel Do Carpo (3.07.37.00-1)" },
  { codigo: "30737044", descricao: "Osteocondroplastia - estabilização, ressecção", secao: "Procedimentos Videoartroscópicos De Punho E Túnel Do Carpo (3.07.37.00-1)" },
  { codigo: "30737052", descricao: "Reconstrução, retencionamento ou reforço de ligamento", secao: "Procedimentos Videoartroscópicos De Punho E Túnel Do Carpo (3.07.37.00-1)" },
  { codigo: "30737028", descricao: "Sinovectomia parcial ou subtotal", secao: "Procedimentos Videoartroscópicos De Punho E Túnel Do Carpo (3.07.37.00-1)" },
  { codigo: "30737010", descricao: "Sinovectomia total", secao: "Procedimentos Videoartroscópicos De Punho E Túnel Do Carpo (3.07.37.00-1)" },
  { codigo: "30737079", descricao: "Túnel do carpo - descompressão", secao: "Procedimentos Videoartroscópicos De Punho E Túnel Do Carpo (3.07.37.00-1)" },
  { codigo: "30738059", descricao: "Condroplastia com sutura labral", secao: "Procedimentos Videoartroscópicos De Coxofemoral (3.07.38.00-8)" },
  { codigo: "30738032", descricao: "Desbridamento do labrum ou ligamento redondo", secao: "Procedimentos Videoartroscópicos De Coxofemoral (3.07.38.00-8)" },
  { codigo: "30738024", descricao: "Sinovectomia parcial e/ou remoção de corpos livres", secao: "Procedimentos Videoartroscópicos De Coxofemoral (3.07.38.00-8)" },
  { codigo: "30738016", descricao: "Sinovectomia total", secao: "Procedimentos Videoartroscópicos De Coxofemoral (3.07.38.00-8)" },
  { codigo: "30738040", descricao: "Tratamento do impacto femoro-acetabular", secao: "Procedimentos Videoartroscópicos De Coxofemoral (3.07.38.00-8)" },
  { codigo: "30801010", descricao: "Colocação de órtese traqueal, traqueobrônquica ou", secao: "Traquéia (3.08.01.00-1)" },
  { codigo: "30801028", descricao: "Colocação de prótese traqueal ou traqueobrônquica", secao: "Traquéia (3.08.01.00-1)" },
  { codigo: "30801036", descricao: "Fechamento de fístula tráqueo-cutânea", secao: "Traquéia (3.08.01.00-1)" },
  { codigo: "30801133", descricao: "Plastia de traqueostoma", secao: "Traquéia (3.08.01.00-1)" },
  { codigo: "30801044", descricao: "Punção traqueal", secao: "Traquéia (3.08.01.00-1)" },
  { codigo: "30801052", descricao: "Ressecção carinal (traqueobrônquica)", secao: "Traquéia (3.08.01.00-1)" },
  { codigo: "30801060", descricao: "Ressecção de tumor traqueal", secao: "Traquéia (3.08.01.00-1)" },
  { codigo: "30801168", descricao: "Ressecção de tumor traqueal por videotoracoscopia", secao: "Traquéia (3.08.01.00-1)" },
  { codigo: "30801079", descricao: "Traqueoplastia (qualquer via)", secao: "Traquéia (3.08.01.00-1)" },
  { codigo: "30801095", descricao: "Traqueostomia", secao: "Traquéia (3.08.01.00-1)" },
  { codigo: "30801109", descricao: "Traqueostomia com colocação de órtese traqueal ou", secao: "Traquéia (3.08.01.00-1)" },
  { codigo: "30801117", descricao: "Traqueostomia mediastinal", secao: "Traquéia (3.08.01.00-1)" },
  { codigo: "30801141", descricao: "Traqueotomia ou fechamento cirúrgico", secao: "Traquéia (3.08.01.00-1)" },
  { codigo: "30801150", descricao: "Troca de prótese tráqueo-esofágica", secao: "Traquéia (3.08.01.00-1)" },
  { codigo: "30802016", descricao: "Broncoplastia e/ou arterioplastia", secao: "Brônquios (3.08.02.00-8)" },
  { codigo: "30802040", descricao: "Broncoplastia e/ou arterioplastia por videotoracoscopia", secao: "Brônquios (3.08.02.00-8)" },
  { codigo: "30802032", descricao: "Colocação de molde brônquico por toracotomia", secao: "Brônquios (3.08.02.00-8)" },
  { codigo: "30803012", descricao: "Bulectomia unilateral", secao: "Brônquios (3.08.02.00-8)" },
  { codigo: "30803179", descricao: "Bulectomia unilateral por videotoracoscopia", secao: "Brônquios (3.08.02.00-8)" },
  { codigo: "30803187", descricao: "Cirurgia redutora do volume pulmonar unilateral", secao: "Brônquios (3.08.02.00-8)" },
  { codigo: "30803020", descricao: "Cirurgia redutora do volume pulmonar unilateral", secao: "Brônquios (3.08.02.00-8)" },
  { codigo: "30803039", descricao: "Cisto pulmonar congênito - tratamento cirúrgico", secao: "Brônquios (3.08.02.00-8)" },
  { codigo: "30803047", descricao: "Correção de fístula bronco-pleural (qualquer técnica)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30803195", descricao: "Correção de fístula bronco-pleural por videotoracoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30803055", descricao: "Drenagem tubular aberta de cavidade pulmonar", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30803209", descricao: "Drenagem tubular aberta de cavidade pulmonar", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30803063", descricao: "Embolectomia pulmonar", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30803071", descricao: "Lobectomia por malformação pulmonar", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30803080", descricao: "Lobectomia pulmonar", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30803217", descricao: "Lobectomia pulmonar por videotoracoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30803098", descricao: "Metastasectomia pulmonar unilateral (qualquer técnica)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30803225", descricao: "Metastasectomia pulmonar unilateral por videotoracoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30803101", descricao: "Pneumonectomia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30803110", descricao: "Pneumonectomia de totalização", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30803136", descricao: "Pneumostomia (cavernostomia) com costectomia e", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30803144", descricao: "Posicionamento de agulhas radiativas por", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30803152", descricao: "Segmentectomia (qualquer técnica)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30803233", descricao: "Segmentectomia por videotoracoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30803160", descricao: "Tromboendarterectomia pulmonar", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30804019", descricao: "Biópsia percutânea de pleura por agulha", secao: "Pleura (3.08.04.00-0)" },
  { codigo: "30804027", descricao: "Descorticação pulmonar", secao: "Pleura (3.08.04.00-0)" },
  { codigo: "30804159", descricao: "Descorticação pulmonar por videotoracoscopia", secao: "Pleura (3.08.04.00-0)" },
  { codigo: "30804035", descricao: "Pleurectomia", secao: "Pleura (3.08.04.00-0)" },
  { codigo: "30804167", descricao: "Pleurectomia por videotoracoscopia", secao: "Pleura (3.08.04.00-0)" },
  { codigo: "30804043", descricao: "Pleurodese (qualquer técnica)", secao: "Pleura (3.08.04.00-0)" },
  { codigo: "30804175", descricao: "Pleurodese por video", secao: "Pleura (3.08.04.00-0)" },
  { codigo: "30804051", descricao: "Pleuroscopia", secao: "Pleura (3.08.04.00-0)" },
  { codigo: "30804183", descricao: "Pleuroscopia por vídeo", secao: "Pleura (3.08.04.00-0)" },
  { codigo: "30804060", descricao: "Pleurostomia (aberta)", secao: "Pleura (3.08.04.00-0)" },
  { codigo: "30804086", descricao: "Punção pleural", secao: "Pleura (3.08.04.00-0)" },
  { codigo: "30804094", descricao: "Repleção de cavidade pleural com solução de antibiótico", secao: "Pleura (3.08.04.00-0)" },
  { codigo: "30804108", descricao: "Ressecção de tumor da pleura localizado", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30804191", descricao: "Ressecção de tumor da pleura localizado por vídeo", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30804116", descricao: "Retirada de dreno tubular torácico (colocado em", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30804124", descricao: "Tenda pleural", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30804205", descricao: "Tenda pleural por vídeo", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30804132", descricao: "Toracostomia com drenagem pleural fechada", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30804140", descricao: "Tratamento operatório da hemorragia intrapleural", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30804213", descricao: "Tratamento operatório da hemorragia intrapleural", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30805031", descricao: "Biópsia de tumor do mediastino (qualquer via)", secao: "Mediastino (3.08.05.00-7)" },
  { codigo: "30805180", descricao: "Biópsia de tumor do mediastino por vídeo", secao: "Mediastino (3.08.05.00-7)" },
  { codigo: "30805040", descricao: "Cisto ou duplicação brônquica ou esôfagica -", secao: "Mediastino (3.08.05.00-7)" },
  { codigo: "30805198", descricao: "Cisto ou duplicação brônquica ou esofágica -", secao: "Mediastino (3.08.05.00-7)" },
  { codigo: "30805201", descricao: "Ligadura de artérias brônquicas para controle de", secao: "Mediastino (3.08.05.00-7)" },
  { codigo: "30805074", descricao: "Ligadura de artérias brônquicas por toracotomia para", secao: "Mediastino (3.08.05.00-7)" },
  { codigo: "30805082", descricao: "Ligadura de ducto-torácico (qualquer via)", secao: "Mediastino (3.08.05.00-7)" },
  { codigo: "30805210", descricao: "Ligadura de ducto-torácico por vídeo", secao: "Mediastino (3.08.05.00-7)" },
  { codigo: "30805090", descricao: "Linfadenectomia mediastinal", secao: "Mediastino (3.08.05.00-7)" },
  { codigo: "30805228", descricao: "Linfadenectomia mediastinal por vídeo", secao: "Mediastino (3.08.05.00-7)" },
  { codigo: "30805104", descricao: "Mediastinoscopia, via cervical", secao: "Mediastino (3.08.05.00-7)" },
  { codigo: "30805236", descricao: "Mediastinoscopia, via cervical por vídeo", secao: "Mediastino (3.08.05.00-7)" },
  { codigo: "30805112", descricao: "Mediastinotomia (via paraesternal, transesternal, cervical)", secao: "Mediastino (3.08.05.00-7)" },
  { codigo: "30805120", descricao: "Mediastinotomia extrapleural por via posterior", secao: "Mediastino (3.08.05.00-7)" },
  { codigo: "30805244", descricao: "Mediastinotomia extrapleural por via posterior por vídeo", secao: "Mediastino (3.08.05.00-7)" },
  { codigo: "30805139", descricao: "Pericardiotomia com abertura pleuro-pericárdica", secao: "Mediastino (3.08.05.00-7)" },
  { codigo: "30805252", descricao: "Pericardiotomia com abertura pleuro-pericárdica por vídeo", secao: "Mediastino (3.08.05.00-7)" },
  { codigo: "30805015", descricao: "Ressecção de bócio intratorácico", secao: "Mediastino (3.08.05.00-7)" },
  { codigo: "30805147", descricao: "Ressecção de tumor de mediastino", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30805260", descricao: "Ressecção de tumor de mediastino por vídeo", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30805295", descricao: "Retirada de corpo estranho do mediastino", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30805155", descricao: "Timectomia (qualquer via)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30805279", descricao: "Timectomia por vídeo", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30805163", descricao: "Tratamento da mediastinite (qualquer via)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30805287", descricao: "Tratamento da mediastinite por vídeo", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30805171", descricao: "Vagotomia troncular terapêutica por toracotomia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30806011", descricao: "Abscesso subfrênico - tratamento cirúrgico", secao: "Diafragma (3.08.06.00-3)" },
  { codigo: "30806020", descricao: "Eventração diafragmática - tratamento cirúrgico", secao: "Diafragma (3.08.06.00-3)" },
  { codigo: "30806038", descricao: "Hérnia diafragmática - tratamento cirúrgico", secao: "Diafragma (3.08.06.00-3)" },
  { codigo: "30806054", descricao: "Hérnia diafragmática – tratamento cirúrgico por vídeo", secao: "Diafragma (3.08.06.00-3)" },
  { codigo: "30901014", descricao: "Ampliação (anel valvar, grandes vasos, átrio, ventrículo)", secao: "Defeitos Cardíacos Congênitos (3.09.01.00-6)" },
  { codigo: "30901022", descricao: "Canal arterial persistente - correção cirúrgica", secao: "Defeitos Cardíacos Congênitos (3.09.01.00-6)" },
  { codigo: "30901030", descricao: "Coarctação da aorta - correção cirúrgica", secao: "Defeitos Cardíacos Congênitos (3.09.01.00-6)" },
  { codigo: "30901049", descricao: "Confecção de bandagem da artéria pulmonar", secao: "Defeitos Cardíacos Congênitos (3.09.01.00-6)" },
  { codigo: "30901057", descricao: "Correção cirúrgica da comunicação interatrial", secao: "Defeitos Cardíacos Congênitos (3.09.01.00-6)" },
  { codigo: "30901065", descricao: "Correção cirúrgica da comunicação interventricular", secao: "Defeitos Cardíacos Congênitos (3.09.01.00-6)" },
  { codigo: "30901073", descricao: "Correção de cardiopatia congênita + cirurgia valvar", secao: "Defeitos Cardíacos Congênitos (3.09.01.00-6)" },
  { codigo: "30901081", descricao: "Correção de cardiopatia congênita +", secao: "Defeitos Cardíacos Congênitos (3.09.01.00-6)" },
  { codigo: "30901103", descricao: "Ressecção (infundíbulo, septo, membranas, bandas)", secao: "Defeitos Cardíacos Congênitos (3.09.01.00-6)" },
  { codigo: "30901111", descricao: "Transposições (vasos, câmaras)", secao: "Defeitos Cardíacos Congênitos (3.09.01.00-6)" },
  { codigo: "30902010", descricao: "Ampliação do anel valvar", secao: "Valvoplastias (3.09.02.00-2)" },
  { codigo: "30902029", descricao: "Cirurgia multivalvar", secao: "Valvoplastias (3.09.02.00-2)" },
  { codigo: "30902037", descricao: "Comissurotomia valvar", secao: "Valvoplastias (3.09.02.00-2)" },
  { codigo: "30902045", descricao: "Plastia valvar", secao: "Valvoplastias (3.09.02.00-2)" },
  { codigo: "30902053", descricao: "Troca valvar", secao: "Valvoplastias (3.09.02.00-2)" },
  { codigo: "30903017", descricao: "Aneurismectomia de VE", secao: "Coronariopatias (3.09.03.00-9)" },
  { codigo: "30903025", descricao: "Revascularização do miocárdio", secao: "Coronariopatias (3.09.03.00-9)" },
  { codigo: "30903033", descricao: "Revascularização do miocárdio + cirurgia valvar", secao: "Coronariopatias (3.09.03.00-9)" },
  { codigo: "30903041", descricao: "Ventriculectomia parcial", secao: "Coronariopatias (3.09.03.00-9)" },
  { codigo: "30904013", descricao: "Cárdio-estimulação transesofágica (CETE), terapêutica", secao: "Marca-Passo (3.09.04.00-5)" },
  { codigo: "30904145", descricao: "Implante de marca-passo bicameral (gerador + eletrodo", secao: "Marca-Passo (3.09.04.00-5)" },
  { codigo: "30904137", descricao: "Implante de marca-passo monocameral (gerador + eletrodo", secao: "Marca-Passo (3.09.04.00-5)" },
  { codigo: "30904099", descricao: "Implante de marca-passo temporário à beira do leito", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30904080", descricao: "Instalação de marca-passo epimiocárdio temporário", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30904102", descricao: "Recolocação de eletrodo / gerador com ou sem", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30904153", descricao: "Remoção de cabo-eletrodo de marcapasso e/ou", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30904110", descricao: "Retirada do sistema (não aplicável na troca do gerador)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30904129", descricao: "Troca de gerador", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30905010", descricao: "Colocação de balão intra-aórtico", secao: "Outros Procedimentos (3.09.05.00-1)" },
  { codigo: "30905028", descricao: "Colocação de stent na aorta sem CEC", secao: "Outros Procedimentos (3.09.05.00-1)" },
  { codigo: "30905052", descricao: "Derivação cavo-atrial", secao: "Outros Procedimentos (3.09.05.00-1)" },
  { codigo: "30905036", descricao: "Instalação do circuito de circulação extracorpórea", secao: "Outros Procedimentos (3.09.05.00-1)" },
  { codigo: "30905044", descricao: "Instalação do circuito de circulação extracorpórea em", secao: "Outros Procedimentos (3.09.05.00-1)" },
  { codigo: "30905060", descricao: "Perfusionista", secao: "Outros Procedimentos (3.09.05.00-1)" },
  { codigo: "30906016", descricao: "Aneurisma de aorta abdominal infra-renal", secao: "Cirurgia Arterial (3.09.06.00-8)" },
  { codigo: "30906024", descricao: "Aneurisma de aorta abdominal supra-renal", secao: "Cirurgia Arterial (3.09.06.00-8)" },
  { codigo: "30906032", descricao: "Aneurisma de aorta-torácica - correção cirúrgica", secao: "Cirurgia Arterial (3.09.06.00-8)" },
  { codigo: "30906040", descricao: "Aneurisma de artérias viscerais", secao: "Cirurgia Arterial (3.09.06.00-8)" },
  { codigo: "30906059", descricao: "Aneurisma de axilar, femoral, poplítea", secao: "Cirurgia Arterial (3.09.06.00-8)" },
  { codigo: "30906067", descricao: "Aneurisma de carótida, subclávia, ilíaca", secao: "Cirurgia Arterial (3.09.06.00-8)" },
  { codigo: "30906075", descricao: "Aneurismas - outros", secao: "Cirurgia Arterial (3.09.06.00-8)" },
  { codigo: "30906083", descricao: "Aneurismas torácicos ou tóraco-abdominais -", secao: "Cirurgia Arterial (3.09.06.00-8)" },
  { codigo: "30906113", descricao: "Angioplastia transluminal transoperatória - por artéria", secao: "Cirurgia Arterial (3.09.06.00-8)" },
  { codigo: "30906121", descricao: "Artéria hipogástrica - unilateral - qualquer técnica", secao: "Cirurgia Arterial (3.09.06.00-8)" },
  { codigo: "30906130", descricao: "Artéria mesentérica inferior - qualquer técnica", secao: "Cirurgia Arterial (3.09.06.00-8)" },
  { codigo: "30906148", descricao: "Artéria mesentérica superior - qualquer técnica", secao: "Cirurgia Arterial (3.09.06.00-8)" },
  { codigo: "30906156", descricao: "Artéria renal bilateral revascularização", secao: "Cirurgia Arterial (3.09.06.00-8)" },
  { codigo: "30906385", descricao: "Arterioplastia da femoral profunda (profundoplastia)", secao: "Cirurgia Arterial (3.09.06.00-8)" },
  { codigo: "30906164", descricao: "Cateterismo da artéria radial - para PAM", secao: "Cirurgia Arterial (3.09.06.00-8)" },
  { codigo: "30906172", descricao: "Correção das dissecções da aorta", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906180", descricao: "Endarterectomia aorto-ilíaca", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906199", descricao: "Endarterectomia carotídea - cada segmento arterial tratado", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906202", descricao: "Endarterectomia ilíaco-femoral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906210", descricao: "Ligadura de carótida ou ramos", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906229", descricao: "Ponte aorto-bifemoral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906237", descricao: "Ponte aorto-biilíaca", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906245", descricao: "Ponte aorto-femoral - unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906253", descricao: "Ponte aorto-ilíaca - unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906261", descricao: "Ponte axilo-bifemoral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906270", descricao: "Ponte axilo-femoral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906288", descricao: "Ponte distal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906296", descricao: "Ponte fêmoro poplítea proximal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906300", descricao: "Ponte fêmoro-femoral cruzada", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906318", descricao: "Ponte fêmoro-femoral ipsilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906326", descricao: "Ponte subclávio bifemoral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906334", descricao: "Ponte subclávio femoral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906342", descricao: "Pontes aorto-cervicais ou endarterectomias dos", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906350", descricao: "Pontes transcervicais - qualquer tipo", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906377", descricao: "Preparo de veia autóloga para remendos vasculares", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906393", descricao: "Reoperação de aorta abdominal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906407", descricao: "Retirada de enxerto infectado em posição não aórtica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906415", descricao: "Revascularização aorto-femoral - unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906423", descricao: "Revascularização arterial de membro superior", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906431", descricao: "Tratamento cirúrgico da isquemia cerebral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906440", descricao: "Tratamento cirúrgico de síndrome vértebro basilar", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906458", descricao: "Tratamento cirúrgico de tumor carotídeo", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30906466", descricao: "Tronco celíaco - qualquer técnica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30907012", descricao: "Cirurgia de restauração venosa com pontes em cavidades", secao: "Cirurgia Venosa (3.09.07.00-4)" },
  { codigo: "30907020", descricao: "Cirurgia de restauração venosa com pontes nos membros", secao: "Cirurgia Venosa (3.09.07.00-4)" },
  { codigo: "30907039", descricao: "Cura cirúrgica da impotência coeundi venosa", secao: "Cirurgia Venosa (3.09.07.00-4)" },
  { codigo: "30907047", descricao: "Cura cirúrgica de hipertensão portal - qualquer tipo", secao: "Cirurgia Venosa (3.09.07.00-4)" },
  { codigo: "30907063", descricao: "Escleroterapia de veias - por sessão - sem insumos", secao: "Cirurgia Venosa (3.09.07.00-4)" },
  { codigo: "30907071", descricao: "Fulguração de telangiectasias (por grupo)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30907098", descricao: "Interrupção cirúrgica veia cava inferior", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30907101", descricao: "Tratamento cirúrgico de varizes com lipodermatoesclerose", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30907110", descricao: "Trombectomia venosa", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30907128", descricao: "Valvuloplastia ou interposição de segmento", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30907152", descricao: "Varizes - ressecção de colaterais com anestesia local em", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30907136", descricao: "Varizes - tratamento cirúrgico de dois membros", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30907144", descricao: "Varizes - tratamento cirúrgico de um membro", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30908019", descricao: "Fístula aorto-cava, reno-cava ou ílio-ilíaca", secao: "Fístulas Arteriovenosas Congênitas Ou Adquiridas (3.09.08.00-0)" },
  { codigo: "30908027", descricao: "Fístula arteriovenosa - com enxerto", secao: "Fístulas Arteriovenosas Congênitas Ou Adquiridas (3.09.08.00-0)" },
  { codigo: "30908035", descricao: "Fístula arteriovenosa cervical ou cefálica extracraniana", secao: "Fístulas Arteriovenosas Congênitas Ou Adquiridas (3.09.08.00-0)" },
  { codigo: "30908051", descricao: "Fístula arteriovenosa congênita - cirurgia radical", secao: "Fístulas Arteriovenosas Congênitas Ou Adquiridas (3.09.08.00-0)" },
  { codigo: "30908043", descricao: "Fístula arteriovenosa congênita - reintervenção", secao: "Fístulas Arteriovenosas Congênitas Ou Adquiridas (3.09.08.00-0)" },
  { codigo: "30908078", descricao: "Fístula arteriovenosa direta", secao: "Fístulas Arteriovenosas Congênitas Ou Adquiridas (3.09.08.00-0)" },
  { codigo: "30908086", descricao: "Fístula arteriovenosa dos grandes vasos intratorácicos", secao: "Fístulas Arteriovenosas Congênitas Ou Adquiridas (3.09.08.00-0)" },
  { codigo: "30908094", descricao: "Fístula arteriovenosa dos membros", secao: "Fístulas Arteriovenosas Congênitas Ou Adquiridas (3.09.08.00-0)" },
  { codigo: "30908108", descricao: "Tromboembolectomia de fístula arteriovenosa", secao: "Fístulas Arteriovenosas Congênitas Ou Adquiridas (3.09.08.00-0)" },
  { codigo: "30909147", descricao: "Hemodepuração de casos agudos (sessão hemodiálise,", secao: "Hemodiálise De Curta E Longa Permanência (3.09.09.00-7)" },
  { codigo: "30909139", descricao: "Hemodepuração de casos agudos (sessão hemodiálise,", secao: "Hemodiálise De Curta E Longa Permanência (3.09.09.00-7)" },
  { codigo: "30909023", descricao: "Hemodiálise contínua (12h)", secao: "Hemodiálise De Curta E Longa Permanência (3.09.09.00-7)" },
  { codigo: "30909031", descricao: "Hemodiálise crônica (por sessão)", secao: "Hemodiálise De Curta E Longa Permanência (3.09.09.00-7)" },
  { codigo: "30910013", descricao: "Aneurisma roto ou trombosado de aorta abdominal", secao: "Cirurgia Vascular De Urgência (3.09.10.00-5)" },
  { codigo: "30910021", descricao: "Aneurismas rotos ou trombosados - outros", secao: "Cirurgia Vascular De Urgência (3.09.10.00-5)" },
  { codigo: "30910030", descricao: "Aneurismas rotos ou trombosados de aorta abdominal", secao: "Cirurgia Vascular De Urgência (3.09.10.00-5)" },
  { codigo: "30910048", descricao: "Aneurismas rotos ou trombosados de artérias viscerais", secao: "Cirurgia Vascular De Urgência (3.09.10.00-5)" },
  { codigo: "30910056", descricao: "Aneurismas rotos ou trombosados de axilar, femoral,", secao: "Cirurgia Vascular De Urgência (3.09.10.00-5)" },
  { codigo: "30910064", descricao: "Aneurismas rotos ou trombosados de carótida,", secao: "Cirurgia Vascular De Urgência (3.09.10.00-5)" },
  { codigo: "30910072", descricao: "Aneurismas rotos ou trombosados torácicos ou", secao: "Cirurgia Vascular De Urgência (3.09.10.00-5)" },
  { codigo: "30910080", descricao: "Embolectomia ou tromboembolectomia arterial", secao: "Cirurgia Vascular De Urgência (3.09.10.00-5)" },
  { codigo: "30910099", descricao: "Exploração vascular em traumas de outros segmentos", secao: "Cirurgia Vascular De Urgência (3.09.10.00-5)" },
  { codigo: "30910102", descricao: "Exploração vascular em traumas torácicos e abdominais", secao: "Cirurgia Vascular De Urgência (3.09.10.00-5)" },
  { codigo: "30910110", descricao: "Lesões vasculares cervicais e cérvico-torácicas", secao: "Cirurgia Vascular De Urgência (3.09.10.00-5)" },
  { codigo: "30910129", descricao: "Lesões vasculares de membro inferior ou superior - unilateral", secao: "Cirurgia Vascular De Urgência (3.09.10.00-5)" },
  { codigo: "30910137", descricao: "Lesões vasculares intra-abdominais", secao: "Cirurgia Vascular De Urgência (3.09.10.00-5)" },
  { codigo: "30910145", descricao: "Lesões vasculares traumáticas intratorácicas", secao: "Cirurgia Vascular De Urgência (3.09.10.00-5)" },
  { codigo: "30911010", descricao: "Avaliação da viabilidade miocárdica por cateter", secao: "Cirurgia Vascular De Urgência (3.09.10.00-5)" },
  { codigo: "30911036", descricao: "Biópsia endomiocárdica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30911044", descricao: "Cateterismo cardíaco D e/ou E com ou sem", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30911109", descricao: "Cateterização cardíaca E por via transeptal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30911125", descricao: "Estudo hemodinâmico das cardiopatias congênitas", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30911133", descricao: "Estudo hemodinâmico de cardiopatias congênitas e/ou", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30911150", descricao: "Mapeamento de feixes anômalos e focos ectópicos por", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912016", descricao: "Ablação de circuito arritmogênico por cateter de", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912024", descricao: "Angioplastia transluminal da aorta ou ramos ou da artéria", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912261", descricao: "Angioplastia transluminal percutânea de bifurcação e", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912032", descricao: "Angioplastia transluminal percutânea de múltiplos vasos,", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912040", descricao: "Angioplastia transluminal percutânea por balão (1 vaso)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912270", descricao: "Ateromectomia rotacional, direcional, extracional ou uso", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912059", descricao: "Atriosseptostomia por balão", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912067", descricao: "Atriosseptostomia por lâmina", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912083", descricao: "Colocação de cateter intracavitário para monitorização", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912075", descricao: "Emboloterapia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912091", descricao: "Implante de prótese intravascular na aorta/pulmonar ou", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912105", descricao: "Implante de stent coronário com ou sem angioplastia por", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912113", descricao: "Infusão seletiva intravascular de enzimas trombolíticas", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912121", descricao: "Oclusão percutânea de “shunts” intracardíacos", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912130", descricao: "Oclusão percutânea de fístula e/ou conexões", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912148", descricao: "Oclusão percutânea do canal arterial", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912156", descricao: "Punção saco pericárdico com introdução de cateter", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912164", descricao: "Punção transeptal com introdução de cateter multipolar", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912172", descricao: "Radiação ou antiproliferação intracoronária", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912180", descricao: "Recanalização arterial no IAM - angioplastia primária - com", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912199", descricao: "Recanalização mecânica do IAM (angioplastia primária", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912202", descricao: "Redução miocárdica por infusão seletiva de drogas", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912210", descricao: "Retirada percutânea de corpos estranhos vasculares", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912229", descricao: "Revascularização transmiocárdica percutânea", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912237", descricao: "Tratamento percutâneo do aneurisma/dissecção da aorta", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912245", descricao: "Valvoplastia percutânea por via arterial ou venosa", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30912253", descricao: "Valvoplastia percutânea por via transeptal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30913144", descricao: "Confecção de fístula AV para hemodiálise", secao: "Acessos Vasculares (3.09.13.00-4)" },
  { codigo: "30913071", descricao: "Dissecção de vaso umbilical com colocação de cateter", secao: "Acessos Vasculares (3.09.13.00-4)" },
  { codigo: "30913098", descricao: "Dissecção de veia com colocação cateter venoso", secao: "Acessos Vasculares (3.09.13.00-4)" },
  { codigo: "30913080", descricao: "Dissecção de veia em RN ou lactente", secao: "Acessos Vasculares (3.09.13.00-4)" },
  { codigo: "30913101", descricao: "Implante cirúrgico de cateter de longa permanência para", secao: "Acessos Vasculares (3.09.13.00-4)" },
  { codigo: "30913012", descricao: "Implante de cateter venoso central por punção, para NPP,", secao: "Acessos Vasculares (3.09.13.00-4)" },
  { codigo: "30913020", descricao: "Instalação de cateter para monitorização hemodinâmica à", secao: "Acessos Vasculares (3.09.13.00-4)" },
  { codigo: "30913047", descricao: "Instalação de circuito para assistência mecânica circulatória", secao: "Acessos Vasculares (3.09.13.00-4)" },
  { codigo: "30913055", descricao: "Manutenção de circuito para assistência mecânica", secao: "Acessos Vasculares (3.09.13.00-4)" },
  { codigo: "30913128", descricao: "Retirada cirúrgica de cateter de longa permanência para", secao: "Acessos Vasculares (3.09.13.00-4)" },
  { codigo: "30913152", descricao: "Retirada/desativação de fístula AV para hemodiálise", secao: "Acessos Vasculares (3.09.13.00-4)" },
  { codigo: "30914019", descricao: "Anastomose linfovenosa", secao: "Cirurgia Linfática (3.09.14.00-0)" },
  { codigo: "30914027", descricao: "Doença de Hodgkin - estadiamento cirúrgico", secao: "Cirurgia Linfática (3.09.14.00-0)" },
  { codigo: "30914051", descricao: "Linfadenectomia cervical", secao: "Cirurgia Linfática (3.09.14.00-0)" },
  { codigo: "30914043", descricao: "Linfadenectomia inguinal ou ilíaca", secao: "Cirurgia Linfática (3.09.14.00-0)" },
  { codigo: "30914060", descricao: "Linfadenectomia pélvica", secao: "Cirurgia Linfática (3.09.14.00-0)" },
  { codigo: "30914140", descricao: "Linfadenectomia pélvica laparoscópica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30914078", descricao: "Linfadenectomia retroperitoneal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30914159", descricao: "Linfadenectomia retroperitoneal laparoscópica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30914086", descricao: "Linfangioplastia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30914132", descricao: "Linfedema - ressecção parcial", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30914094", descricao: "Linfedema - ressecção total", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30914108", descricao: "Linfedema genital - ressecção", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30914116", descricao: "Marsupialização de linfocele", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30914167", descricao: "Marsupialização laparoscópica de linfocele", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30914124", descricao: "Punção biópsia ganglionar", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "30915015", descricao: "Correção cirúrgica das arritmias", secao: "Pericárdio (3.09.15.00-7)" },
  { codigo: "30915023", descricao: "Drenagem do pericárdio", secao: "Pericárdio (3.09.15.00-7)" },
  { codigo: "30915058", descricao: "Drenagem do pericárdio por vídeo", secao: "Pericárdio (3.09.15.00-7)" },
  { codigo: "30915031", descricao: "Pericardiocentese", secao: "Pericárdio (3.09.15.00-7)" },
  { codigo: "30915040", descricao: "Pericardiotomia / Pericardiectomia", secao: "Pericárdio (3.09.15.00-7)" },
  { codigo: "30915066", descricao: "Pericardiotomia / Pericardiectomia por vídeo", secao: "Pericárdio (3.09.15.00-7)" },
  { codigo: "30916011", descricao: "Hipotermia profunda com ou sem parada circulatória total", secao: "Hipotermia (3.09.16.00-3)" },
  { codigo: "30917018", descricao: "Biópsia do miocárdio", secao: "Miocárdio (3.09.17.00-0)" },
  { codigo: "30917026", descricao: "Cardiomioplastia", secao: "Miocárdio (3.09.17.00-0)" },
  { codigo: "30917034", descricao: "Cardiotomia (ferimento, corpo estranho, exploração)", secao: "Miocárdio (3.09.17.00-0)" },
  { codigo: "30917042", descricao: "Retirada de tumores intracardíacos", secao: "Miocárdio (3.09.17.00-0)" },
  { codigo: "31001017", descricao: "Atresia de esôfago com fístula traqueal -", secao: "Esôfago (3.10.01.00-9)" },
  { codigo: "31001025", descricao: "Atresia de esôfago sem fístula (dupla estomia) -", secao: "Esôfago (3.10.01.00-9)" },
  { codigo: "31001033", descricao: "Autotransplante com microcirurgia", secao: "Esôfago (3.10.01.00-9)" },
  { codigo: "31001297", descricao: "Dissecção do esôfago torácico (qualquer técnica)", secao: "Esôfago (3.10.01.00-9)" },
  { codigo: "31001300", descricao: "Esofagectomia distal com ou sem toracotomia por", secao: "Esôfago (3.10.01.00-9)" },
  { codigo: "31001041", descricao: "Esofagectomia distal com toracotomia", secao: "Esôfago (3.10.01.00-9)" },
  { codigo: "31001050", descricao: "Esofagectomia distal sem toracotomia", secao: "Esôfago (3.10.01.00-9)" },
  { codigo: "31001254", descricao: "Esofagectomia subtotal com linfadenectomia com ou", secao: "Esôfago (3.10.01.00-9)" },
  { codigo: "31001068", descricao: "Esofagoplastia (coloplastia)", secao: "Esôfago (3.10.01.00-9)" },
  { codigo: "31001076", descricao: "Esofagoplastia (gastroplastia)", secao: "Esôfago (3.10.01.00-9)" },
  { codigo: "31001220", descricao: "Esofagostomia", secao: "Esôfago (3.10.01.00-9)" },
  { codigo: "31001084", descricao: "Estenose de esôfago - tratamento cirúrgico via torácica", secao: "Esôfago (3.10.01.00-9)" },
  { codigo: "31001092", descricao: "Faringo-laringo-esofagectomia total com ou sem toracotomia", secao: "Esôfago (3.10.01.00-9)" },
  { codigo: "31001106", descricao: "Fístula tráqueo esofágica - tratamento cirúrgico via cervical", secao: "Esôfago (3.10.01.00-9)" },
  { codigo: "31001114", descricao: "Fístula tráqueo esofágica - tratamento cirúrgico via torácica", secao: "Esôfago (3.10.01.00-9)" },
  { codigo: "31001270", descricao: "Reconstrução do esôfago cervical e torácico com", secao: "Esôfago (3.10.01.00-9)" },
  { codigo: "31001289", descricao: "Reconstrução do esôfago cervical ou torácico, com", secao: "Esôfago (3.10.01.00-9)" },
  { codigo: "31001149", descricao: "Reintervenção sobre a transição esôfago gástrica", secao: "Esôfago (3.10.01.00-9)" },
  { codigo: "31001319", descricao: "Reintervenção sobre a transição esôfago gástrica por", secao: "Esôfago (3.10.01.00-9)" },
  { codigo: "31001157", descricao: "Ressecção do esôfago cervical e/ou torácico e transplante", secao: "Esôfago (3.10.01.00-9)" },
  { codigo: "31001165", descricao: "Substituição esofágica - cólon ou tubo gástrico", secao: "Esôfago (3.10.01.00-9)" },
  { codigo: "31001181", descricao: "Tratamento cirúrgico conservador do megaesofago", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31001335", descricao: "Tratamento cirúrgico conservador do megaesofago", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31001173", descricao: "Tratamento cirúrgico das varizes esofágicas", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31001327", descricao: "Tratamento cirúrgico das varizes esofágicas por", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31001238", descricao: "Tratamento cirúrgico do divertículo esofágico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31001351", descricao: "Tratamento cirúrgico do divertículo esofágico por", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31001246", descricao: "Tratamento cirúrgico do divertículo faringoesofágico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31001190", descricao: "Tunelização esofágica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31002013", descricao: "Colocação de banda gástrica", secao: "Estômago (3.10.02.00-5)" },
  { codigo: "31002285", descricao: "Colocação de banda gástrica por videolaparoscopia", secao: "Estômago (3.10.02.00-5)" },
  { codigo: "31002021", descricao: "Conversão de anastomose gastrojejunal (qualquer técnica)", secao: "Estômago (3.10.02.00-5)" },
  { codigo: "31002293", descricao: "Conversão de anastomose gastrojejunal por", secao: "Estômago (3.10.02.00-5)" },
  { codigo: "31002030", descricao: "Degastrogastrectomia com vagotomia", secao: "Estômago (3.10.02.00-5)" },
  { codigo: "31002048", descricao: "Degastrogastrectomia sem vagotomia", secao: "Estômago (3.10.02.00-5)" },
  { codigo: "31002064", descricao: "Gastrectomia parcial com linfadenectomia", secao: "Estômago (3.10.02.00-5)" },
  { codigo: "31002307", descricao: "Gastrectomia parcial com linfadenectomia por", secao: "Estômago (3.10.02.00-5)" },
  { codigo: "31002072", descricao: "Gastrectomia parcial com vagotomia", secao: "Estômago (3.10.02.00-5)" },
  { codigo: "31002315", descricao: "Gastrectomia parcial com vagotomia por videolaparoscopia.. 10B", secao: "Estômago (3.10.02.00-5)" },
  { codigo: "31002080", descricao: "Gastrectomia parcial sem vagotomia", secao: "Estômago (3.10.02.00-5)" },
  { codigo: "31002323", descricao: "Gastrectomia parcial sem vagotomia por videolaparoscopia", secao: "Estômago (3.10.02.00-5)" },
  { codigo: "31002099", descricao: "Gastrectomia polar superior com reconstrução jejunal", secao: "Estômago (3.10.02.00-5)" },
  { codigo: "31002102", descricao: "Gastrectomia polar superior com reconstrução jejunal", secao: "Estômago (3.10.02.00-5)" },
  { codigo: "31002110", descricao: "Gastrectomia total com linfadenectomia", secao: "Estômago (3.10.02.00-5)" },
  { codigo: "31002331", descricao: "Gastrectomia total com linfadenectomia por", secao: "Estômago (3.10.02.00-5)" },
  { codigo: "31002129", descricao: "Gastrectomia total via abdominal", secao: "Estômago (3.10.02.00-5)" },
  { codigo: "31002340", descricao: "Gastrectomia total via abdominal por videolaparoscopia", secao: "Estômago (3.10.02.00-5)" },
  { codigo: "31002137", descricao: "Gastroenteroanastomose", secao: "Estômago (3.10.02.00-5)" },
  { codigo: "31002358", descricao: "Gastroenteroanastomose por videolaparoscopia", secao: "Estômago (3.10.02.00-5)" },
  { codigo: "31002218", descricao: "Gastroplastia para obesidade mórbida - qualquer técnica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31002390", descricao: "Gastroplastia para obesidade mórbida por", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31002056", descricao: "Gastrostomia confecção / fechamento", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31002153", descricao: "Gastrotomia com sutura de varizes", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31002161", descricao: "Gastrotomia para retirada de CE ou lesão isolada", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31002366", descricao: "Gastrotomia para retirada de CE ou lesão isolada por", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31002188", descricao: "Membrana antral - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31002196", descricao: "Piloroplastia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31002374", descricao: "Piloroplastia por videolaparoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31002242", descricao: "Tratamento cirúrgico das varizes gástricas", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31002250", descricao: "Vagotomia com operação de drenagem", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31002269", descricao: "Vagotomia gástrica proximal ou superseletiva com", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31002404", descricao: "Vagotomia gástrica proximal ou superseletiva com duodeno-", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31002277", descricao: "Vagotomia superseletiva ou vagotomia gástrica proximal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31002412", descricao: "Vagotomia superseletiva ou vagotomia gástrica proximal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003010", descricao: "Amputação abdômino-perineal do reto (completa)", secao: "Intestinos (3.10.03.00-1)" },
  { codigo: "31003575", descricao: "Amputação abdômino-perineal do reto (completa) por", secao: "Intestinos (3.10.03.00-1)" },
  { codigo: "31003028", descricao: "Amputação do reto por procidência", secao: "Intestinos (3.10.03.00-1)" },
  { codigo: "31003036", descricao: "Anomalia anorretal - correção via sagital posterior", secao: "Intestinos (3.10.03.00-1)" },
  { codigo: "31003044", descricao: "Anomalia anorretal - tratamento cirúrgico via abdômino-", secao: "Intestinos (3.10.03.00-1)" },
  { codigo: "31003052", descricao: "Anomalia anorretal - tratamento cirúrgico via perineal", secao: "Intestinos (3.10.03.00-1)" },
  { codigo: "31003060", descricao: "Anorretomiomectomia", secao: "Intestinos (3.10.03.00-1)" },
  { codigo: "31003079", descricao: "Apendicectomia", secao: "Intestinos (3.10.03.00-1)" },
  { codigo: "31003583", descricao: "Apendicectomia por videolaparoscopia", secao: "Intestinos (3.10.03.00-1)" },
  { codigo: "31003087", descricao: "Apple-Peel - tratamento cirúrgico", secao: "Intestinos (3.10.03.00-1)" },
  { codigo: "31003095", descricao: "Atresia de cólon - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003109", descricao: "Atresia de duodeno - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003117", descricao: "Atresia jejunal distal ou ileal - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003125", descricao: "Atresia jejunal proximal - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003133", descricao: "Cirurgia de abaixamento - qualquer técnica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003591", descricao: "Cirurgia de abaixamento por videolaparoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003141", descricao: "Cirurgia de acesso posterior", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003150", descricao: "Cisto mesentérico - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003605", descricao: "Cisto mesentérico - tratamento cirúrgico por", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003168", descricao: "Colectomia parcial com colostomia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003613", descricao: "Colectomia parcial com colostomia por videolaparoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003176", descricao: "Colectomia parcial sem colostomia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003621", descricao: "Colectomia parcial sem colostomia por videolaparoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003184", descricao: "Colectomia total com íleo-reto-anastomose", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003630", descricao: "Colectomia total com íleo-reto-anastomose por", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003192", descricao: "Colectomia total com ileostomia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003648", descricao: "Colectomia total com ileostomia por videolaparoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003206", descricao: "Colocação de sonda enteral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003214", descricao: "Colostomia ou enterostomia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003249", descricao: "Distorção de volvo por laparotomia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003257", descricao: "Distorção de volvo por via endoscópica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003656", descricao: "Distorção de volvo por videolaparoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003265", descricao: "Divertículo de Meckel - exérese", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003664", descricao: "Divertículo de Meckel - exérese por videolaparoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003273", descricao: "Duplicação do tubo digestivo - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003281", descricao: "Enterectomia segmentar", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003672", descricao: "Enterectomia segmentar por videolaparoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003290", descricao: "Entero-anastomose - qualquer segmento", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003680", descricao: "Entero-anastomose (qualquer segmento)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003303", descricao: "Enterocolite necrotizante - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003311", descricao: "Enteropexia - qualquer segmento", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003699", descricao: "Enteropexia (qualquer segmento) por videolaparoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003338", descricao: "Esporão retal - ressecção", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003346", descricao: "Esvaziamento pélvico anterior ou posterior", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003702", descricao: "Esvaziamento pélvico anterior ou posterior por", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003354", descricao: "Esvaziamento pélvico total", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003710", descricao: "Esvaziamento pélvico total por videolaparoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003362", descricao: "Fecaloma - remoção manual", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003370", descricao: "Fechamento de colostomia ou enterostomia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003389", descricao: "Fixação do reto por via abdominal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003729", descricao: "Fixação do reto por via abdominal por videolaparoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003397", descricao: "Íleo meconial - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003427", descricao: "Invaginação intestinal - ressecção", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003435", descricao: "Invaginação intestinal sem ressecção - tratamento cirúrgico 8A", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003451", descricao: "Má-rotação intestinal - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003460", descricao: "Megacólon congênito - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003737", descricao: "Megacólon congênito - tratamento cirúrgico por", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003478", descricao: "Membrana duodenal - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003486", descricao: "Pâncreas anular - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003745", descricao: "Pâncreas anular - tratamento cirúrgico por", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003494", descricao: "Perfuração duodenal ou delgado - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003753", descricao: "Perfuração duodenal ou delgado - tratamento cirúrgico por", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003508", descricao: "Piloromiotomia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003761", descricao: "Piloromiotomia por videolaparoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003516", descricao: "Procidência do reto - redução manual", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003524", descricao: "Proctocolectomia total", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003532", descricao: "Proctocolectomia total com reservatório ileal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003770", descricao: "Proctocolectomia total com reservatório ileal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003788", descricao: "Proctocolectomia total por videolaparoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003540", descricao: "Ressecção total de intestino delgado", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003559", descricao: "Retossigmoidectomia abdominal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003796", descricao: "Retossigmoidectomia abdominal por videolaparoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31003567", descricao: "Tumor anorretal - ressecção endo-anal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31004016", descricao: "Abscesso anorretal - drenagem", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004024", descricao: "Abscesso isquio-retal - drenagem", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004342", descricao: "Anopexia mecânica com grampeador", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004032", descricao: "Cerclagem anal", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004040", descricao: "Corpo estranho do reto - retirada", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004059", descricao: "Criptectomia (única ou múltipla)", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004067", descricao: "Dilatação digital ou instrumental do ânus e/ou do reto", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004083", descricao: "Estenose anal - tratamento cirúrgico (qualquer técnica)", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004091", descricao: "Excisão de plicoma", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004113", descricao: "Fístula reto-vaginal e fístula anal em ferradura -", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004121", descricao: "Fistulectomia anal em dois tempos", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004130", descricao: "Fistulectomia anal em ferradura", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004148", descricao: "Fistulectomia anal em um tempo", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004156", descricao: "Fistulectomia anorretal com abaixamento mucoso", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004164", descricao: "Fistulectomia perineal", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004172", descricao: "Hemorróidas - fotocoagulação com raio infravermelho", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004180", descricao: "Hemorróidas - ligadura elástica (por sessão)", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004199", descricao: "Hemorróidas - tratamento esclerosante (por sessão)", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004202", descricao: "Hemorroidectomia aberta ou fechada, com", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004210", descricao: "Laceração anorretal - tratamento cirúrgico por via perineal", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004229", descricao: "Lesão anal - eletrocauterização", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004237", descricao: "Papilectomia (única ou múltipla)", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004245", descricao: "Pólipo retal - ressecção endoanal", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004253", descricao: "Prolapso retal - esclerose (por sessão)", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004261", descricao: "Prolapso retal - tratamento cirúrgico", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004326", descricao: "Prurido anal - tratamento cirúrgico", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004288", descricao: "Reconstrução total anoperineal", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004300", descricao: "Tratamento cirúrgico de retocele (colpoperineoplastia", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31004318", descricao: "Trombose hemorroidária - exérese", secao: "Ânus (3.10.04.00-8)" },
  { codigo: "31005012", descricao: "Abscesso hepático - drenagem cirúrgica (até 3 fragmentos)", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005454", descricao: "Abscesso hepático - drenagem cirúrgica por", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005020", descricao: "Alcoolização percutânea dirigida de tumor hepático", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005462", descricao: "Alcoolização percutânea dirigida de tumor hepático por", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005039", descricao: "Anastomose biliodigestiva intra-hepática", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005047", descricao: "Atresia de vias biliares - tratamento cirúrgico", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005683", descricao: "Biópsia hepática por laparotomia (acima de 3 fragmentos)", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005063", descricao: "Biópsia hepática por laparotomia (até 3 fragmentos)", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005675", descricao: "Biópsia hepática por videolaparoscopia", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005691", descricao: "Biópsia hepática transparietal (acima de 3 fragmentos)", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005071", descricao: "Biópsia hepática transparietal (até 3 fragmentos)", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005098", descricao: "Cisto de colédoco - tratamento cirúrgico", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005110", descricao: "Colecistectomia com fístula biliodigestiva", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005489", descricao: "Colecistectomia com fístula biliodigestiva por", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005136", descricao: "Colecistojejunostomia", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005500", descricao: "Colecistojejunostomia por videolaparoscopia", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005144", descricao: "Colecistostomia", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005519", descricao: "Colecistostomia por videolaparoscopia", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005152", descricao: "Colédoco ou hepático-jejunostomia (qualquer técnica)", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005527", descricao: "Colédoco ou hepático-jejunostomia por videolaparoscopia", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005160", descricao: "Colédoco ou hepaticoplastia", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005179", descricao: "Colédoco-duodenostomia", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005535", descricao: "Colédoco-duodenostomia por videolaparoscopia", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005195", descricao: "Coledocoscopia intra-operatória", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005446", descricao: "Coledocotomia ou coledocostomia com colecistectomia", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005543", descricao: "Coledocotomia ou coledocostomia com colecistectomia", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005187", descricao: "Coledocotomia ou coledocostomia sem colecistectomia", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005551", descricao: "Coledocotomia ou coledocostomia sem colecistectomia", secao: "Fígado E Vias Biliares (3.10.05.00-4)" },
  { codigo: "31005209", descricao: "Derivação porto sistêmica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005217", descricao: "Desconexão ázigos - portal com esplenectomia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005560", descricao: "Desconexão ázigos - portal com esplenectomia por", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005225", descricao: "Desconexão ázigos - portal sem esplenectomia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005578", descricao: "Desconexão ázigos - portal sem esplenectomia por", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005233", descricao: "Desvascularização hepática", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005241", descricao: "Drenagem biliar trans-hepática", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005250", descricao: "Enucleação de metástases hepáticas", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005586", descricao: "Enucleação de metástases hepáticas por videolaparoscopia 10B", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005268", descricao: "Enucleação de metástases, por metástase", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005080", descricao: "Laparotomia para implantação cirúrgica de cateter arterial", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005292", descricao: "Lobectomia hepática direita", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005616", descricao: "Lobectomia hepática direita por videolaparoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005306", descricao: "Lobectomia hepática esquerda", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005624", descricao: "Lobectomia hepática esquerda por videolaparoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005314", descricao: "Papilotomia transduodenal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005322", descricao: "Punção hepática para drenagem de abscessos", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005632", descricao: "Punção hepática para drenagem de abscessos por", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005330", descricao: "Radioablação / termoablação de tumores hepáticos", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005640", descricao: "Radioablação / termoablação de tumores hepáticos por", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005357", descricao: "Ressecção de cisto hepático com hepatectomia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005659", descricao: "Ressecção de cisto hepático com hepatectomia por", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005365", descricao: "Ressecção de cisto hepático sem hepatectomia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005667", descricao: "Ressecção de cisto hepático sem hepatectomia por", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005373", descricao: "Ressecção de tumor de vesícula ou da via biliar", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005381", descricao: "Ressecção de tumor de vesícula ou da via biliar", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005390", descricao: "Segmentectomia hepática", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005403", descricao: "Sequestrectomia hepática", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005420", descricao: "Tratamento cirúrgico de estenose cicatricial das vias biliares", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31005438", descricao: "Trissegmentectomias", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31006019", descricao: "Biópsia de pâncreas por laparotomia", secao: "Pâncreas (3.10.06.00-0)" },
  { codigo: "31006027", descricao: "Biópsia de pâncreas por punção dirigida", secao: "Pâncreas (3.10.06.00-0)" },
  { codigo: "31006159", descricao: "Biópsia de pâncreas por videolaparoscopia", secao: "Pâncreas (3.10.06.00-0)" },
  { codigo: "31006035", descricao: "Enucleação de tumores pancreáticos", secao: "Pâncreas (3.10.06.00-0)" },
  { codigo: "31006167", descricao: "Enucleação de tumores pancreáticos por", secao: "Pâncreas (3.10.06.00-0)" },
  { codigo: "31006043", descricao: "Hipoglicemia - tratamento cirúrgico (pancreatotomia", secao: "Pâncreas (3.10.06.00-0)" },
  { codigo: "31006051", descricao: "Pancreatectomia corpo caudal com preservação do baço", secao: "Pâncreas (3.10.06.00-0)" },
  { codigo: "31006060", descricao: "Pancreatectomia parcial ou sequestrectomia", secao: "Pâncreas (3.10.06.00-0)" },
  { codigo: "31006078", descricao: "Pancreato-duodenectomia com linfadenectomia", secao: "Pâncreas (3.10.06.00-0)" },
  { codigo: "31006086", descricao: "Pancreato-enterostomia", secao: "Pâncreas (3.10.06.00-0)" },
  { codigo: "31006108", descricao: "Pseudocisto pâncreas - drenagem externa (qualquer", secao: "Pâncreas (3.10.06.00-0)" },
  { codigo: "31006175", descricao: "Pseudocisto pâncreas - drenagem externa por", secao: "Pâncreas (3.10.06.00-0)" },
  { codigo: "31006116", descricao: "Pseudocisto pâncreas - drenagem interna (qualquer técnica)", secao: "Pâncreas (3.10.06.00-0)" },
  { codigo: "31006183", descricao: "Pseudocisto pâncreas - drenagem interna por", secao: "Pâncreas (3.10.06.00-0)" },
  { codigo: "31007015", descricao: "Biópsia esplênica", secao: "Baço (3.10.07.00-7)" },
  { codigo: "31007023", descricao: "Esplenectomia parcial", secao: "Baço (3.10.07.00-7)" },
  { codigo: "31007058", descricao: "Esplenectomia parcial por videolaparoscopia", secao: "Baço (3.10.07.00-7)" },
  { codigo: "31007031", descricao: "Esplenectomia total", secao: "Baço (3.10.07.00-7)" },
  { codigo: "31007066", descricao: "Esplenectomia total por videolaparoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31008020", descricao: "Diálise peritoneal ambulatorial contínua (CAPD) 9 dias -", secao: "Peritônio (3.10.08.00-3)" },
  { codigo: "31008038", descricao: "Diálise peritoneal ambulatorial contínua (CAPD) por", secao: "Peritônio (3.10.08.00-3)" },
  { codigo: "31008046", descricao: "Diálise peritoneal automática (APD) - tratamento (agudo", secao: "Peritônio (3.10.08.00-3)" },
  { codigo: "31008119", descricao: "Diálise peritoneal automática por mês (agudo ou crônico)", secao: "Peritônio (3.10.08.00-3)" },
  { codigo: "31008011", descricao: "Diálise peritoneal intermitente - agudo ou crônico", secao: "Peritônio (3.10.08.00-3)" },
  { codigo: "31008054", descricao: "Epiploplastia", secao: "Peritônio (3.10.08.00-3)" },
  { codigo: "31008100", descricao: "Epiploplastia por videolaparoscopia", secao: "Peritônio (3.10.08.00-3)" },
  { codigo: "31008062", descricao: "Implante de cateter peritoneal", secao: "Peritônio (3.10.08.00-3)" },
  { codigo: "31008070", descricao: "Instalação de cateter Tenckhoff", secao: "Peritônio (3.10.08.00-3)" },
  { codigo: "31008097", descricao: "Retirada de cateter Tenckhoff", secao: "Peritônio (3.10.08.00-3)" },
  { codigo: "31009018", descricao: "Abscesso perineal - drenagem cirúrgica", secao: "Peritônio (3.10.08.00-3)" },
  { codigo: "31009026", descricao: "Biópsia de parede abdominal", secao: "Peritônio (3.10.08.00-3)" },
  { codigo: "31009042", descricao: "Cisto sacro-coccígeo - tratamento cirúrgico", secao: "Peritônio (3.10.08.00-3)" },
  { codigo: "31009050", descricao: "Diástase dos retos-abdominais - tratamento cirúrgico", secao: "Peritônio (3.10.08.00-3)" },
  { codigo: "31009069", descricao: "Hérnia inguinal encarcerada em RN ou lactente", secao: "Peritônio (3.10.08.00-3)" },
  { codigo: "31009174", descricao: "Laparotomia exploradora, ou para biópsia, ou para", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31009352", descricao: "Laparotomia exploradora, ou para biópsia, ou para", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31009204", descricao: "Neuroblastoma abdominal - exérese", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31009239", descricao: "Onfalocele/gastrosquise - segundo tempo -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31009220", descricao: "Onfalocele/gastrosquise em 1 tempo ou primeiro tempo ou", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31009247", descricao: "Paracentese abdominal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31009255", descricao: "Reconstrução da parede abdominal com retalho muscular", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31009271", descricao: "Ressecção de cisto ou fístula de úraco", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31009280", descricao: "Ressecção de cisto ou fístula ou restos do ducto", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31009298", descricao: "Ressutura da parede abdominal (por deiscência total ou", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31009301", descricao: "Teratoma sacro-coccígeo - exérese", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101011", descricao: "Abscesso renal ou peri-renal - drenagem cirúrgica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101020", descricao: "Abscesso renal ou peri-renal - drenagem percutânea", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101488", descricao: "Adrenalectomia laparoscópica unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101038", descricao: "Adrenalectomia unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101046", descricao: "Angioplastia renal unilateral a céu aberto", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101054", descricao: "Angioplastia renal unilateral transluminal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101062", descricao: "Autotransplante renal unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101070", descricao: "Biópsia renal cirúrgica unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101500", descricao: "Biópsia renal laparoscópica unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101089", descricao: "Cisto renal - escleroterapia percutânea - por cisto", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101097", descricao: "Endopielotomia percutânea unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101100", descricao: "Estenose de junção pieloureteral - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101119", descricao: "Fístula pielo-cutânea - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101127", descricao: "Lombotomia exploradora", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101135", descricao: "Marsupialização de cistos renais unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101496", descricao: "Marsupialização laparoscópica de cisto renal unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101151", descricao: "Nefrectomia parcial com ureterectomia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101569", descricao: "Nefrectomia parcial laparoscópica unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101160", descricao: "Nefrectomia parcial unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101178", descricao: "Nefrectomia parcial unilateral extracorpórea", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101550", descricao: "Nefrectomia radical laparoscópica unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101186", descricao: "Nefrectomia radical unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101194", descricao: "Nefrectomia total unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101585", descricao: "Nefrectomia total unilateral por videolaparoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101208", descricao: "Nefro ou pieloenterocistostomia unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101224", descricao: "Nefrolitotomia percutânea unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101232", descricao: "Nefrolitotomia simples unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101240", descricao: "Nefrolitotripsia extracorpórea - 1ª sessão", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101259", descricao: "Nefrolitotripsia extracorpórea - reaplicações (até 3 meses ..) 4C", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101275", descricao: "Nefrolitotripsia percutânea unilateral (MEC., E.H., ou US)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101577", descricao: "Nefrolitotripsia percutânea unilateral a laser", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101518", descricao: "Nefropexia laparoscópica unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101283", descricao: "Nefropexia unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101305", descricao: "Nefrostomia a céu aberto unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101313", descricao: "Nefrostomia percutânea unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101542", descricao: "Nefroureterectomia com ressecção vesical laparoscópica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101321", descricao: "Nefroureterectomia com ressecção vesical unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101348", descricao: "Pielolitotomia com nefrolitotomia simples unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101534", descricao: "Pielolitotomia laparoscópica unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101356", descricao: "Pielolitotomia unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101364", descricao: "Pieloplastia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101526", descricao: "Pieloplastia laparoscópica unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101372", descricao: "Pielostomia unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101380", descricao: "Pielotomia exploradora unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101399", descricao: "Punção aspirativa renal para diagnóstico de rejeição", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101402", descricao: "Punção biópsia renal percutânea", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101410", descricao: "Revascularização renal - qualquer técnica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101437", descricao: "Transuretero anastomose", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101445", descricao: "Tratamento cirúrgico da fístula pielo-intestinal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101453", descricao: "Tumor renal - enucleação unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101461", descricao: "Tumor Wilms - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31101470", descricao: "Tumores retro-peritoneais malignos unilaterais - exérese", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102018", descricao: "Biópsia cirúrgica de ureter unilateral", secao: "Ureter (3.11.02.00-0)" },
  { codigo: "31102026", descricao: "Biópsia endoscópica de ureter unilateral", secao: "Ureter (3.11.02.00-0)" },
  { codigo: "31102034", descricao: "Cateterismo ureteral unilateral", secao: "Ureter (3.11.02.00-0)" },
  { codigo: "31102042", descricao: "Colocação cirúrgica de duplo J unilateral", secao: "Ureter (3.11.02.00-0)" },
  { codigo: "31102050", descricao: "Colocação cistoscópica de duplo J unilateral", secao: "Ureter (3.11.02.00-0)" },
  { codigo: "31102069", descricao: "Colocação nefroscópica de duplo J unilateral", secao: "Ureter (3.11.02.00-0)" },
  { codigo: "31102077", descricao: "Colocação ureteroscópica de duplo J unilateral", secao: "Ureter (3.11.02.00-0)" },
  { codigo: "31102085", descricao: "Dilatação endoscópica unilateral", secao: "Ureter (3.11.02.00-0)" },
  { codigo: "31102093", descricao: "Duplicação pieloureteral - tratamento cirúrgico", secao: "Ureter (3.11.02.00-0)" },
  { codigo: "31102107", descricao: "Fístula uretero-cutânea unilateral - tratamento cirúrgico", secao: "Ureter (3.11.02.00-0)" },
  { codigo: "31102115", descricao: "Fístula uretero-intestinal unilateral - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102123", descricao: "Fístula uretero-vaginal unilateral - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102131", descricao: "Meatotomia endoscópica unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102182", descricao: "Reimplante ureteral por via extra ou intravesical unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102557", descricao: "Reimplante ureterointestinal laparoscópico unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102174", descricao: "Reimplante ureterointestinal uni ou bilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102549", descricao: "Reimplante uretero-vesical laparoscópico unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102204", descricao: "Reimplante uretero-vesical unilateral - via combinada", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102220", descricao: "Retirada endoscópica de cálculo de ureter unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102239", descricao: "Transureterostomia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102247", descricao: "Ureterectomia unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102255", descricao: "Ureterocele unilateral - ressecção a céu aberto", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102263", descricao: "Ureteroceles - tratamento endoscópico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102271", descricao: "Ureteroileocistostomia unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102280", descricao: "Ureteroileostomia cutânea unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102506", descricao: "Ureterólise laparoscópica unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102298", descricao: "Ureterólise unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102492", descricao: "Ureterolitotomia laparoscópica unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102301", descricao: "Ureterolitotomia unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102310", descricao: "Ureterolitotripsia extracorpórea - 1ª sessão", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102328", descricao: "Ureterolitotripsia extracorpórea - reaplicações (até 3 meses)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102522", descricao: "Ureteroplastia laparoscópica unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102344", descricao: "Ureteroplastia unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102352", descricao: "Ureterorrenolitotomia unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102379", descricao: "Ureterorrenolitotripsia rígida unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102565", descricao: "Ureterorrenolitotripsia rígida unilateral a laser", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102409", descricao: "Ureterossigmoidoplastia unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102417", descricao: "Ureterossigmoidostomia unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102425", descricao: "Ureterostomia cutânea unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102433", descricao: "Ureterotomia interna percutânea unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102450", descricao: "Ureterotomia interna ureteroscópica rígida unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102468", descricao: "Ureteroureterocistoneostomia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102514", descricao: "Ureteroureterostomia laparoscópica unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31102476", descricao: "Ureteroureterostomia unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31103014", descricao: "Ampliação vesical", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103022", descricao: "Bexiga psóica", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103030", descricao: "Biópsia endoscópica de bexiga (inclui cistoscopia)", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103049", descricao: "Biópsia vesical a céu aberto", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103057", descricao: "Cálculo vesical - extração endoscópica", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103065", descricao: "Cistectomia parcial", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103529", descricao: "Cistectomia parcial laparoscópica", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103073", descricao: "Cistectomia radical (inclui próstata ou útero)", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103537", descricao: "Cistectomia radical laparoscópica (inclui próstata ou útero)", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103081", descricao: "Cistectomia total", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103090", descricao: "Cistolitotomia", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103561", descricao: "Cistolitotripsia a laser", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103103", descricao: "Cistolitotripsia extracorpórea - 1ª sessão", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103111", descricao: "Cistolitotripsia extracorpórea - reaplicações (até 3 meses)", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103138", descricao: "Cistolitotripsia percutânea (U.S., E.H., E.C.)", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103146", descricao: "Cistolitotripsia transuretral (U.S., E.H., E.C.)", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103154", descricao: "Cistoplastia redutora", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103170", descricao: "Cistostomia cirúrgica", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103189", descricao: "Cistostomia com procedimento endoscópico", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103197", descricao: "Cistostomia por punção com trocater", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103200", descricao: "Colo de divertículo - ressecção endoscópica", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103219", descricao: "Colo vesical - ressecção endoscópica", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103227", descricao: "Corpo estranho - extração cirúrgica", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103235", descricao: "Corpo estranho - extração endoscópica", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103510", descricao: "Correção laparoscópica de incontinência urinária", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103243", descricao: "Diverticulectomia vesical", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103553", descricao: "Diverticulectomia vesical laparoscópica", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103251", descricao: "Enterocistoplastia (ampliação vesical)", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103286", descricao: "Fístula vésico-cutânea - tratamento cirúrgico", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103294", descricao: "Fístula vésico-entérica - tratamento cirúrgico", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103308", descricao: "Fístula vésico-retal - tratamento cirúrgico", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103316", descricao: "Fístula vésico-uterina - tratamento cirúrgico", secao: "Bexiga (3.11.03.00-6)" },
  { codigo: "31103324", descricao: "Fístula vésico-vaginal - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31103332", descricao: "Incontinência urinária - “sling” vaginal ou abdominal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31103340", descricao: "Incontinência urinária - suspensão endoscópica de colo", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31103359", descricao: "Incontinência urinária - tratamento cirúrgico supra-púbico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31103367", descricao: "Incontinência urinária - tratamento endoscópico (injeção)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31103375", descricao: "Incontinência urinária com colpoplastia anterior -", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31103480", descricao: "Neobexiga cutânea continente", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31103545", descricao: "Neobexiga laparoscópica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31103499", descricao: "Neobexiga retal continente", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31103502", descricao: "Neobexiga uretral continente", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31103383", descricao: "Pólipos vesicais - ressecção cirúrgica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31103391", descricao: "Pólipos vesicais - ressecção endoscópica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31103405", descricao: "Punção e aspiração vesical", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31103413", descricao: "Reimplante uretero-vesical à Boari", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31103430", descricao: "Retenção por coágulo - aspiração vesical", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31103472", descricao: "Retirada endoscópica de duplo J", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31103448", descricao: "Tumor vesical - fotocoagulação a laser", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31103456", descricao: "Tumor vesical - ressecção endoscópica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31103464", descricao: "Vesicostomia cutânea", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31104010", descricao: "Abscesso periuretral - tratamento cirúrgico", secao: "Uretra (3.11.04.00-2)" },
  { codigo: "31104029", descricao: "Biópsia endoscópica de uretra", secao: "Uretra (3.11.04.00-2)" },
  { codigo: "31104037", descricao: "Corpo estranho ou cálculo - extração cirúrgica", secao: "Uretra (3.11.04.00-2)" },
  { codigo: "31104045", descricao: "Corpo estranho ou cálculo - extração endoscópica", secao: "Uretra (3.11.04.00-2)" },
  { codigo: "31104053", descricao: "Divertículo uretral - tratamento cirúrgico", secao: "Uretra (3.11.04.00-2)" },
  { codigo: "31104061", descricao: "Eletrocoagulação endoscópica", secao: "Uretra (3.11.04.00-2)" },
  { codigo: "31104088", descricao: "Fístula uretro-cutânea - correção cirúrgica", secao: "Uretra (3.11.04.00-2)" },
  { codigo: "31104096", descricao: "Fístula uretro-retal - correção cirúrgica", secao: "Uretra (3.11.04.00-2)" },
  { codigo: "31104100", descricao: "Fístula uretro-vaginal - correção cirúrgica", secao: "Uretra (3.11.04.00-2)" },
  { codigo: "31104118", descricao: "Incontinência urinária masculina - tratamento cirúrgico", secao: "Uretra (3.11.04.00-2)" },
  { codigo: "31104126", descricao: "Injeções periuretrais (incluindo uretrocistocopia)", secao: "Uretra (3.11.04.00-2)" },
  { codigo: "31104134", descricao: "Meatoplastia (retalho cutâneo)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31104142", descricao: "Meatotomia uretral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31104150", descricao: "Neouretra proximal (cistouretroplastia)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31104169", descricao: "Ressecção de carúncula", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31104177", descricao: "Ressecção de válvula uretral posterior", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31104185", descricao: "Tumor uretral - excisão", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31104240", descricao: "Uretrectomia total", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31104193", descricao: "Uretroplastia anterior", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31104207", descricao: "Uretroplastia posterior", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31104215", descricao: "Uretrostomia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31104223", descricao: "Uretrotomia interna", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31104231", descricao: "Uretrotomia interna com prótese endouretral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31201016", descricao: "Ablação prostática a laser", secao: "Próstata E Vesículas Seminais (3.12.01.00-8)" },
  { codigo: "31201024", descricao: "Abscesso de próstata - drenagem", secao: "Próstata E Vesículas Seminais (3.12.01.00-8)" },
  { codigo: "31201032", descricao: "Biópsia prostática - até 8 fragmentos", secao: "Próstata E Vesículas Seminais (3.12.01.00-8)" },
  { codigo: "31201040", descricao: "Biópsia prostática - mais de 8 fragmentos", secao: "Próstata E Vesículas Seminais (3.12.01.00-8)" },
  { codigo: "31201059", descricao: "Eletrovaporização de próstata", secao: "Próstata E Vesículas Seminais (3.12.01.00-8)" },
  { codigo: "31201156", descricao: "Exérese laparoscópica de cisto de vesícula seminal", secao: "Próstata E Vesículas Seminais (3.12.01.00-8)" },
  { codigo: "31201067", descricao: "Hemorragia da loja prostática - evacuação e irrigação", secao: "Próstata E Vesículas Seminais (3.12.01.00-8)" },
  { codigo: "31201075", descricao: "Hemorragia da loja prostática - revisão endoscópica", secao: "Próstata E Vesículas Seminais (3.12.01.00-8)" },
  { codigo: "31201113", descricao: "Prostatavesiculectomia radical", secao: "Próstata E Vesículas Seminais (3.12.01.00-8)" },
  { codigo: "31201148", descricao: "Prostatavesiculectomia radical laparoscópica", secao: "Próstata E Vesículas Seminais (3.12.01.00-8)" },
  { codigo: "31201121", descricao: "Prostatectomia a céu aberto", secao: "Próstata E Vesículas Seminais (3.12.01.00-8)" },
  { codigo: "31201130", descricao: "Ressecção endoscópica da próstata", secao: "Próstata E Vesículas Seminais (3.12.01.00-8)" },
  { codigo: "31202020", descricao: "Drenagem de abscesso", secao: "Escroto (3.12.02.00-4)" },
  { codigo: "31202039", descricao: "Elefantíase peno-escrotal - tratamento cirúrgico", secao: "Escroto (3.12.02.00-4)" },
  { codigo: "31202047", descricao: "Exérese de cisto escrotal", secao: "Escroto (3.12.02.00-4)" },
  { codigo: "31202063", descricao: "Reconstrução da bolsa escrotal com retalho inguinal", secao: "Escroto (3.12.02.00-4)" },
  { codigo: "31202071", descricao: "Ressecção parcial da bolsa escrotal", secao: "Escroto (3.12.02.00-4)" },
  { codigo: "31203019", descricao: "Autotransplante de um testículo", secao: "Testículo (3.12.03.00-0)" },
  { codigo: "31203027", descricao: "Biópsia unilateral de testículo", secao: "Testículo (3.12.03.00-0)" },
  { codigo: "31203159", descricao: "Correção laparoscópica de varicocele unilateral", secao: "Testículo (3.12.03.00-0)" },
  { codigo: "31203035", descricao: "Escroto agudo - exploração cirúrgica", secao: "Testículo (3.12.03.00-0)" },
  { codigo: "31203043", descricao: "Hidrocele unilateral - correção cirúrgica", secao: "Testículo (3.12.03.00-0)" },
  { codigo: "31203051", descricao: "Implante de prótese testicular unilateral", secao: "Testículo (3.12.03.00-0)" },
  { codigo: "31203132", descricao: "Orquidopexia laparoscópica unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31203060", descricao: "Orquidopexia unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31203140", descricao: "Orquiectomia intra-abdominal laparoscópica unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31203078", descricao: "Orquiectomia unilateral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31203086", descricao: "Punção da vaginal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31203094", descricao: "Reparação plástica (trauma)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31203108", descricao: "Torção de testículo - cura cirúrgica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31203116", descricao: "Tumor de testículo - ressecção", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31203124", descricao: "Varicocele unilateral - correção cirúrgica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31204015", descricao: "Biópsia de epidídimo", secao: "Epidídimo (3.12.04.00-7)" },
  { codigo: "31204023", descricao: "Drenagem de abscesso", secao: "Epidídimo (3.12.04.00-7)" },
  { codigo: "31204031", descricao: "Epididimectomia unilateral", secao: "Epidídimo (3.12.04.00-7)" },
  { codigo: "31204040", descricao: "Epididimovasoplastia unilateral", secao: "Epidídimo (3.12.04.00-7)" },
  { codigo: "31204058", descricao: "Epididimovasoplastia unilateral microcirúrgica", secao: "Epidídimo (3.12.04.00-7)" },
  { codigo: "31204066", descricao: "Exérese de cisto unilateral", secao: "Epidídimo (3.12.04.00-7)" },
  { codigo: "31205070", descricao: "Cirurgia esterilizadora masculina", secao: "Epidídimo (3.12.04.00-7)" },
  { codigo: "31205011", descricao: "Espermatocelectomia unilateral", secao: "Epidídimo (3.12.04.00-7)" },
  { codigo: "31205020", descricao: "Exploração cirúrgica do deferente unilateral", secao: "Epidídimo (3.12.04.00-7)" },
  { codigo: "31205038", descricao: "Recanalização dos ductos deferentes", secao: "Epidídimo (3.12.04.00-7)" },
  { codigo: "31205046", descricao: "Vasectomia unilateral", secao: "Epidídimo (3.12.04.00-7)" },
  { codigo: "31205054", descricao: "Vaso-vasostomia microcirúrgica unilateral (recanalização", secao: "Epidídimo (3.12.04.00-7)" },
  { codigo: "31206018", descricao: "Amputação parcial", secao: "Pênis (3.12.06.00-0)" },
  { codigo: "31206026", descricao: "Amputação total", secao: "Pênis (3.12.06.00-0)" },
  { codigo: "31206034", descricao: "Biópsia peniana", secao: "Pênis (3.12.06.00-0)" },
  { codigo: "31206042", descricao: "Doença de Peyronie - tratamento cirúrgico", secao: "Pênis (3.12.06.00-0)" },
  { codigo: "31206050", descricao: "Eletrocoagulação de lesões cutâneas", secao: "Pênis (3.12.06.00-0)" },
  { codigo: "31206069", descricao: "Emasculação", secao: "Pênis (3.12.06.00-0)" },
  { codigo: "31206077", descricao: "Epispadia - reconstrução por etapa", secao: "Pênis (3.12.06.00-0)" },
  { codigo: "31206085", descricao: "Epispadia com incontinência - tratamento cirúrgico", secao: "Pênis (3.12.06.00-0)" },
  { codigo: "31206093", descricao: "Fratura de pênis - tratamento cirúrgico", secao: "Pênis (3.12.06.00-0)" },
  { codigo: "31206107", descricao: "Hipospadia - por estágio", secao: "Pênis (3.12.06.00-0)" },
  { codigo: "31206115", descricao: "Hipospadia distal - tratamento em 1 tempo", secao: "Pênis (3.12.06.00-0)" },
  { codigo: "31206123", descricao: "Hipospadia proximal - tratamento em 1 tempo", secao: "Pênis (3.12.06.00-0)" },
  { codigo: "31206158", descricao: "Neofaloplastia - por estágio", secao: "Pênis (3.12.06.00-0)" },
  { codigo: "31206166", descricao: "Neofaloplastia com retalho inguinal pediculado com", secao: "Pênis (3.12.06.00-0)" },
  { codigo: "31206182", descricao: "Pênis curvo congênito", secao: "Pênis (3.12.06.00-0)" },
  { codigo: "31206190", descricao: "Plástica - retalho cutâneo à distância", secao: "Pênis (3.12.06.00-0)" },
  { codigo: "31206204", descricao: "Plástica de corpo cavernoso", secao: "Pênis (3.12.06.00-0)" },
  { codigo: "31206212", descricao: "Plástica do freio bálano-prepucial", secao: "Pênis (3.12.06.00-0)" },
  { codigo: "31206220", descricao: "Postectomia", secao: "Pênis (3.12.06.00-0)" },
  { codigo: "31206239", descricao: "Priapismo - tratamento cirúrgico", secao: "Pênis (3.12.06.00-0)" },
  { codigo: "31206247", descricao: "Reconstrução de pênis com enxerto - plástica total", secao: "Pênis (3.12.06.00-0)" },
  { codigo: "31206255", descricao: "Reimplante do pênis", secao: "Pênis (3.12.06.00-0)" },
  { codigo: "31206263", descricao: "Revascularização peniana", secao: "Pênis (3.12.06.00-0)" },
  { codigo: "31301010", descricao: "Bartolinectomia unilateral", secao: "Vulva (3.13.01.00-2)" },
  { codigo: "31301029", descricao: "Biópsia de vulva", secao: "Vulva (3.13.01.00-2)" },
  { codigo: "31301037", descricao: "Cauterização química, ou eletrocauterização, ou", secao: "Vulva (3.13.01.00-2)" },
  { codigo: "31301045", descricao: "Clitorectomia (parcial ou total)", secao: "Vulva (3.13.01.00-2)" },
  { codigo: "31301053", descricao: "Clitoroplastia", secao: "Vulva (3.13.01.00-2)" },
  { codigo: "31301061", descricao: "Excisão radical local da vulva (não inclui a linfadenectomia) 9A", secao: "Vulva (3.13.01.00-2)" },
  { codigo: "31301070", descricao: "Exérese de glândula de Skene", secao: "Vulva (3.13.01.00-2)" },
  { codigo: "31301088", descricao: "Exérese de lesão da vulva e/ou do períneo (por grupo de", secao: "Vulva (3.13.01.00-2)" },
  { codigo: "31301100", descricao: "Incisão e drenagem da glândula de Bartholin ou Skene", secao: "Vulva (3.13.01.00-2)" },
  { codigo: "31301118", descricao: "Marsupialização da glândula de Bartholin", secao: "Vulva (3.13.01.00-2)" },
  { codigo: "31301126", descricao: "Vulvectomia ampliada (não inclui a linfadenectomia)", secao: "Vulva (3.13.01.00-2)" },
  { codigo: "31301134", descricao: "Vulvectomia simples", secao: "Vulva (3.13.01.00-2)" },
  { codigo: "31302017", descricao: "Biópsia de vagina", secao: "Vagina (3.13.02.00-9)" },
  { codigo: "31302130", descricao: "Cauterização química, ou eletrocauterização, ou", secao: "Vagina (3.13.02.00-9)" },
  { codigo: "31302025", descricao: "Colpectomia", secao: "Vagina (3.13.02.00-9)" },
  { codigo: "31302033", descricao: "Colpocleise (Lefort)", secao: "Vagina (3.13.02.00-9)" },
  { codigo: "31302041", descricao: "Colpoplastia anterior", secao: "Vagina (3.13.02.00-9)" },
  { codigo: "31302076", descricao: "Colpotomia ou culdocentese", secao: "Vagina (3.13.02.00-9)" },
  { codigo: "31302084", descricao: "Exérese de cisto vaginal", secao: "Vagina (3.13.02.00-9)" },
  { codigo: "31302092", descricao: "Extração de corpo estranho com anestesia geral ou bloqueio", secao: "Vagina (3.13.02.00-9)" },
  { codigo: "31302106", descricao: "Fístula ginecológica - tratamento cirúrgico", secao: "Vagina (3.13.02.00-9)" },
  { codigo: "31302114", descricao: "Himenotomia", secao: "Vagina (3.13.02.00-9)" },
  { codigo: "31302122", descricao: "Neovagina (cólon, delgado, tubo de pele)", secao: "Vagina (3.13.02.00-9)" },
  { codigo: "31303013", descricao: "Aspiração manual intra-uterina (AMIU)", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31303021", descricao: "Biópsia do colo uterino", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31303030", descricao: "Biópsia do endométrio", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31303196", descricao: "Cauterização química, ou eletrocauterização, ou", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31303056", descricao: "Curetagem ginecológica semiótica e/ou terapêutica com", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31303315", descricao: "Curetagem uterina pós-parto", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31303064", descricao: "Dilatação do colo uterino", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31303072", descricao: "Excisão de pólipo cervical", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31303323", descricao: "Histerectomia pós-parto", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31303080", descricao: "Histerectomia subtotal com ou sem anexectomia, uni ou", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31303200", descricao: "Histerectomia subtotal laparoscópica com ou sem", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31303102", descricao: "Histerectomia total - qualquer via", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31303110", descricao: "Histerectomia total ampliada - qualquer via - (não inclui", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31303129", descricao: "Histerectomia total com anexectomia uni ou bilateral -", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31303218", descricao: "Histerectomia total laparoscópica", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31303226", descricao: "Histerectomia total laparoscópica ampliada", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31303234", descricao: "Histerectomia total laparoscópica com anexectomia", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31303170", descricao: "Histeroscopia cirúrgica com biópsia e/ou curetagem uterina,", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31303188", descricao: "Histeroscopia com ressectoscópio para miomectomia,", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31303293", descricao: "Implante de dispositivo intra-uterino (DIU) hormonal", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31303269", descricao: "Implante de dispositivo intra-uterino (DIU) não hormonal", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31303137", descricao: "Metroplastia (Strassmann ou outra técnica)", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31303242", descricao: "Metroplastia laparoscópica", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31303145", descricao: "Miomectomia uterina", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31303250", descricao: "Miomectomia uterina laparoscópica", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31303153", descricao: "Traquelectomia - amputação, conização (com ou sem", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31303161", descricao: "Traquelectomia radical (não inclui a linfadenectomia)", secao: "Útero (3.13.03.00-5)" },
  { codigo: "31304010", descricao: "Cirurgia esterilizadora feminina", secao: "Tubas (3.13.04.00-1)" },
  { codigo: "31304052", descricao: "Cirurgia esterilizadora feminina laparoscópica", secao: "Tubas (3.13.04.00-1)" },
  { codigo: "31304028", descricao: "Neossalpingostomia distal", secao: "Tubas (3.13.04.00-1)" },
  { codigo: "31304060", descricao: "Neossalpingostomia distal laparoscópica", secao: "Tubas (3.13.04.00-1)" },
  { codigo: "31304036", descricao: "Recanalização tubária - qualquer técnica, uni ou bilateral", secao: "Tubas (3.13.04.00-1)" },
  { codigo: "31304079", descricao: "Recanalização tubária laparoscópica uni ou bilateral", secao: "Tubas (3.13.04.00-1)" },
  { codigo: "31304044", descricao: "Salpingectomia uni ou bilateral", secao: "Tubas (3.13.04.00-1)" },
  { codigo: "31304087", descricao: "Salpingectomia uni ou bilateral laparoscópica", secao: "Tubas (3.13.04.00-1)" },
  { codigo: "31305032", descricao: "Ooforectomia laparoscópica uni ou bilateral ou ooforoplastia", secao: "Ovários (3.13.05.00-8)" },
  { codigo: "31305016", descricao: "Ooforectomia uni ou bilateral ou ooforoplastia uni ou bilateral", secao: "Ovários (3.13.05.00-8)" },
  { codigo: "31305024", descricao: "Translocação de ovários", secao: "Ovários (3.13.05.00-8)" },
  { codigo: "31306012", descricao: "Correção de defeito lateral", secao: "Períneo (3.13.06.00-4)" },
  { codigo: "31306020", descricao: "Correção de enterocele", secao: "Períneo (3.13.06.00-4)" },
  { codigo: "31306039", descricao: "Correção de rotura perineal de III grau (com lesão do", secao: "Períneo (3.13.06.00-4)" },
  { codigo: "31306055", descricao: "Reconstrução perineal com retalhos miocutâneos", secao: "Períneo (3.13.06.00-4)" },
  { codigo: "31306063", descricao: "Ressecção de tumor do septo reto-vaginal", secao: "Períneo (3.13.06.00-4)" },
  { codigo: "31306080", descricao: "Retração cicatricial perineal", secao: "Períneo (3.13.06.00-4)" },
  { codigo: "31306071", descricao: "Seio urogenital - plástica", secao: "Períneo (3.13.06.00-4)" },
  { codigo: "31307019", descricao: "Câncer de ovário (Debulking)", secao: "Cavidade E Paredes Pélvicas (3.13.07.00-0)" },
  { codigo: "31307159", descricao: "Câncer de ovário (Debulking) laparoscópica", secao: "Cavidade E Paredes Pélvicas (3.13.07.00-0)" },
  { codigo: "31307027", descricao: "Cirurgia (via alta ou baixa) do prolapso de cúpula vaginal", secao: "Cavidade E Paredes Pélvicas (3.13.07.00-0)" },
  { codigo: "31307167", descricao: "Cirurgia laparoscópica do prolapso de cúpula vaginal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31307035", descricao: "Culdoplastia (Mac Call, Moschowicz, etc.)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31307175", descricao: "Culdoplastia laparoscópica (Mac Call, Moschowicz, etc)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31307043", descricao: "Endometriose peritoneal - tratamento cirúrgico", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31307183", descricao: "Endometriose peritoneal - tratamento cirúrgico via", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31307051", descricao: "Epiploplastia ou aplicação de membranas antiaderentes", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31307191", descricao: "Epiploplastia ou aplicação de membranas antiaderentes", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31307060", descricao: "Laparoscopia ginecológica com ou sem biópsia (inclui a", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31307078", descricao: "Liberação de aderências pélvicas com ou sem ressecção", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31307205", descricao: "Liberação laparoscópica de aderências pélvicas com ou", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31307086", descricao: "Ligadura de veia ovariana", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31307213", descricao: "Ligadura de veia ovariana laparoscópica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31307094", descricao: "Ligamentopexia pélvica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31307221", descricao: "Ligamentopexia pélvica laparoscópica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31307230", descricao: "Neurectomia laparoscópica pré-sacral ou do nervo", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31307108", descricao: "Neurectomia pré-sacral ou do nervo gênito-femoral", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31307116", descricao: "Omentectomia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31307248", descricao: "Omentectomia laparoscópica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31307124", descricao: "Ressecção de tumor de parede abdominal pélvica", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31307256", descricao: "Ressecção laparoscópica de tumor de parede abdominal", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31307132", descricao: "Ressecção ou ligadura de varizes pélvicas", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31307264", descricao: "Ressecção ou ligadura laparoscópica de varizes pélvicas", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31307140", descricao: "Secção de ligamentos útero-sacros", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31307272", descricao: "Secção laparoscópica de ligamentos útero-sacros", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31308015", descricao: "Aspiração de folículos para fertilização", secao: "Infertilidade (3.13.08.00-7)" },
  { codigo: "31308023", descricao: "GIFT (transferência de gametas para as trompas)", secao: "Infertilidade (3.13.08.00-7)" },
  { codigo: "31308040", descricao: "Transferência de embrião para o útero", secao: "Infertilidade (3.13.08.00-7)" },
  { codigo: "31309011", descricao: "Amniorredução ou amnioinfusão", secao: "Partos E Outros Procedimentos Obstétricos (3.13.09.00-3)" },
  { codigo: "31309020", descricao: "Aspiração manual intra-uterina (AMIU) pós-abortamento", secao: "Partos E Outros Procedimentos Obstétricos (3.13.09.00-3)" },
  { codigo: "31309038", descricao: "Assistência ao trabalho de parto, por hora (até o", secao: "Partos E Outros Procedimentos Obstétricos (3.13.09.00-3)" },
  { codigo: "31309046", descricao: "Cerclagem do colo uterino - qualquer técnica", secao: "Partos E Outros Procedimentos Obstétricos (3.13.09.00-3)" },
  { codigo: "31309054", descricao: "Cesariana", secao: "Partos E Outros Procedimentos Obstétricos (3.13.09.00-3)" },
  { codigo: "31309062", descricao: "Curetagem pós-abortamento", secao: "Partos E Outros Procedimentos Obstétricos (3.13.09.00-3)" },
  { codigo: "31309070", descricao: "Derivações em cirurgia fetal", secao: "Partos E Outros Procedimentos Obstétricos (3.13.09.00-3)" },
  { codigo: "31309089", descricao: "Gravidez ectópica - cirurgia", secao: "Partos E Outros Procedimentos Obstétricos (3.13.09.00-3)" },
  { codigo: "31309186", descricao: "Gravidez ectópica - cirurgia laparoscópica", secao: "Partos E Outros Procedimentos Obstétricos (3.13.09.00-3)" },
  { codigo: "31309119", descricao: "Inversão uterina - tratamento cirúrgico", secao: "Partos E Outros Procedimentos Obstétricos (3.13.09.00-3)" },
  { codigo: "31309194", descricao: "Inversão uterina - tratamento cirúrgico laparoscópico", secao: "Partos E Outros Procedimentos Obstétricos (3.13.09.00-3)" },
  { codigo: "31309100", descricao: "Inversão uterina aguda - redução manual", secao: "Partos E Outros Procedimentos Obstétricos (3.13.09.00-3)" },
  { codigo: "31309097", descricao: "Maturação cervical para indução de abortamento ou", secao: "Partos E Outros Procedimentos Obstétricos (3.13.09.00-3)" },
  { codigo: "31309127", descricao: "Parto (via vaginal)", secao: "Partos E Outros Procedimentos Obstétricos (3.13.09.00-3)" },
  { codigo: "31309135", descricao: "Parto múltiplo (cada um subsequente ao inicial)", secao: "Partos E Outros Procedimentos Obstétricos (3.13.09.00-3)" },
  { codigo: "31309143", descricao: "Punção escalpofetal para avaliação PH fetal", secao: "Partos E Outros Procedimentos Obstétricos (3.13.09.00-3)" },
  { codigo: "31309151", descricao: "Revisão obstétrica de parto ocorrido fora do hospital (inclui", secao: "Partos E Outros Procedimentos Obstétricos (3.13.09.00-3)" },
  { codigo: "31309178", descricao: "Versão cefálica externa", secao: "Partos E Outros Procedimentos Obstétricos (3.13.09.00-3)" },
  { codigo: "31401341", descricao: "Acesso endoscópico ao tratamento cirúrgico dos", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401015", descricao: "Biópsia estereotáxica de encéfalo", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401023", descricao: "Cingulotomia ou capsulotomia unilateral", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401031", descricao: "Cirurgia intracraniana por via endoscópica", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401040", descricao: "Craniotomia para remoção de corpo estranho", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401058", descricao: "Derivação ventricular externa", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401066", descricao: "Drenagem estereotáxica - cistos, hematomas ou", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401350", descricao: "Implantação de halo para radiocirurgia", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401082", descricao: "Implante de cateter intracraniano", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401090", descricao: "Implante de eletrodo cerebral profundo", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401104", descricao: "Implante de eletrodos cerebral ou medular", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401112", descricao: "Implante estereotáxico de cateter para braquiterapia", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401120", descricao: "Implante intratecal de bombas para infusão de fármacos", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401139", descricao: "Localização estereotáxica de corpo estranho intracraniano", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401147", descricao: "Localização estereotáxica de lesões intracranianas", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401155", descricao: "Microcirurgia para tumores intracranianos", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401163", descricao: "Microcirurgia por via transesfenoidal", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401171", descricao: "Microcirurgia vascular intracraniana", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401198", descricao: "Punção subdural ou ventricular transfontanela", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401201", descricao: "Ressecção de mucocele frontal", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401228", descricao: "Revisão de sistema de neuroestimulação", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401236", descricao: "Sistema de derivação ventricular interna com válvulas", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401244", descricao: "Terceiro ventriculostomia", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401252", descricao: "Tratamento cirúrgico da epilepsia", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401260", descricao: "Tratamento cirúrgico da fístula liquórica", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401279", descricao: "Tratamento cirúrgico da meningoencefalocele", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401287", descricao: "Tratamento cirúrgico de tumores cerebrais sem microscopia . 10B", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401295", descricao: "Tratamento cirúrgico do abscesso encefálico", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401309", descricao: "Tratamento cirúrgico do hematoma intracraniano", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31401333", descricao: "Tratamento pré-natal das hidrocefalias e cistos cerebrais", secao: "Encéfalo (3.14.01.00-7)" },
  { codigo: "31402011", descricao: "Cordotomia-mielotomias por radiofrequência", secao: "Medula (3.14.02.00-3)" },
  { codigo: "31402020", descricao: "Lesão de substância gelatinosa medular (DREZ) por", secao: "Medula (3.14.02.00-3)" },
  { codigo: "31402038", descricao: "Tampão sanguíneo peridural para tratamento de cefaléia", secao: "Medula (3.14.02.00-3)" },
  { codigo: "31403018", descricao: "Biópsia de nervo", secao: "Nervos Periféricos ( 3.14.03.00-0)" },
  { codigo: "31403026", descricao: "Bloqueio de nervo periférico", secao: "Nervos Periféricos ( 3.14.03.00-0)" },
  { codigo: "31403034", descricao: "Denervação percutânea de faceta articular - por segmento . 9C", secao: "Nervos Periféricos ( 3.14.03.00-0)" },
  { codigo: "31403042", descricao: "Enxerto de nervo", secao: "Nervos Periféricos ( 3.14.03.00-0)" },
  { codigo: "31403050", descricao: "Enxerto de nervo interfascicular, pediculado (1º estágio)", secao: "Nervos Periféricos ( 3.14.03.00-0)" },
  { codigo: "31403069", descricao: "Enxerto de nervo interfascicular, pediculado (2º estágio)", secao: "Nervos Periféricos ( 3.14.03.00-0)" },
  { codigo: "31403085", descricao: "Enxerto interfascicular", secao: "Nervos Periféricos ( 3.14.03.00-0)" },
  { codigo: "31403077", descricao: "Enxerto interfascicular de nervo vascularizado", secao: "Nervos Periféricos ( 3.14.03.00-0)" },
  { codigo: "31403093", descricao: "Enxerto para reparo de 2 ou mais nervos", secao: "Nervos Periféricos ( 3.14.03.00-0)" },
  { codigo: "31403107", descricao: "Excisão de tumores de nervos periféricos com enxerto", secao: "Nervos Periféricos ( 3.14.03.00-0)" },
  { codigo: "31403115", descricao: "Excisão de tumores dos nervos periféricos", secao: "Nervos Periféricos ( 3.14.03.00-0)" },
  { codigo: "31403123", descricao: "Exploração cirúrgica de nervo (neurólise externa)", secao: "Nervos Periféricos ( 3.14.03.00-0)" },
  { codigo: "31403131", descricao: "Extirpação de neuroma", secao: "Nervos Periféricos ( 3.14.03.00-0)" },
  { codigo: "31403140", descricao: "Implante de gerador para neuroestimulação", secao: "Nervos Periféricos ( 3.14.03.00-0)" },
  { codigo: "31403158", descricao: "Lesão de nervos associada à lesão óssea", secao: "Nervos Periféricos ( 3.14.03.00-0)" },
  { codigo: "31403166", descricao: "Lesão estereotáxica de estruturas profundas para", secao: "Nervos Periféricos ( 3.14.03.00-0)" },
  { codigo: "31403174", descricao: "Microcirurgia do plexo braquial com a exploração, neurólise", secao: "Nervos Periféricos ( 3.14.03.00-0)" },
  { codigo: "31403182", descricao: "Microcirurgia do plexo braquial com exploração e neurólise", secao: "Nervos Periféricos ( 3.14.03.00-0)" },
  { codigo: "31403212", descricao: "Microneurólise intraneural ou intrafascicular de dois", secao: "Nervos Periféricos ( 3.14.03.00-0)" },
  { codigo: "31403204", descricao: "Microneurólise intraneural ou intrafascicular de um nervo", secao: "Nervos Periféricos ( 3.14.03.00-0)" },
  { codigo: "31403220", descricao: "Microneurólise múltiplas", secao: "Nervos Periféricos ( 3.14.03.00-0)" },
  { codigo: "31403239", descricao: "Microneurólise única", secao: "Nervos Periféricos ( 3.14.03.00-0)" },
  { codigo: "31403280", descricao: "Neurólise das síndromes compressivas", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31403298", descricao: "Neurotripsia (cada extremidade)", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31403301", descricao: "Reposição de fármaco(s) em bombas implantadas", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31403310", descricao: "Ressecção de neuroma", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31403328", descricao: "Revisão de sistema implantados para infusão de fármacos", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31403336", descricao: "Rizotomia percutânea por segmento - qualquer método", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31403344", descricao: "Simpatectomia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31403379", descricao: "Simpatectomia por videotoracoscopia", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31403352", descricao: "Transposição de nervo", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31403360", descricao: "Tratamento microcirúrgico das neuropatias compressivas", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31404014", descricao: "Descompressão vascular de nervos cranianos", secao: "Nervos Cranianos (3.14.04.00-6)" },
  { codigo: "31404022", descricao: "Neurotomia seletiva do trigêmio", secao: "Nervos Cranianos (3.14.04.00-6)" },
  { codigo: "31404030", descricao: "Tratamento da nevralgia do trigêmio por técnica cirúrgica", secao: "Nervos Cranianos (3.14.04.00-6)" },
  { codigo: "31405010", descricao: "Bloqueio do sistema nervoso autônomo", secao: "Sistema Nervoso Autônomo (3.14.05.00-2)" },
  { codigo: "31405029", descricao: "Lesão do sistema nervoso autônomo - qualquer método", secao: "Sistema Nervoso Autônomo (3.14.05.00-2)" },
  { codigo: "31501028", descricao: "Retirada para transplante", secao: "Córnea (3.15.01.00-1)" },
  { codigo: "31501010", descricao: "Transplante de córnea", secao: "Córnea (3.15.01.00-1)" },
  { codigo: "31502016", descricao: "Transplante cardíaco (doador)", secao: "Cardíaco (3.15.02.00-8)" },
  { codigo: "31502024", descricao: "Transplante cardíaco (receptor)", secao: "Cardíaco (3.15.02.00-8)" },
  { codigo: "31503012", descricao: "Transplante cardiopulmonar (doador)", secao: "Cardiopulmonar (3.15.03.00-4)" },
  { codigo: "31503020", descricao: "Transplante cardiopulmonar (receptor)", secao: "Cardiopulmonar (3.15.03.00-4)" },
  { codigo: "31504019", descricao: "Transplante pulmonar (doador)", secao: "Pulmonar (3.15.04.00-0)" },
  { codigo: "31504027", descricao: "Transplante pulmonar unilateral (receptor)", secao: "Pulmonar (3.15.04.00-0)" },
  { codigo: "31505023", descricao: "Transplante hepático (doador)", secao: "Hepático (3.15.05.00-7)" },
  { codigo: "31505015", descricao: "Transplante hepático (receptor)", secao: "Hepático (3.15.05.00-7)" },
  { codigo: "31506038", descricao: "Nefrectomia em doador vivo", secao: "Renal (3.15.06.00-3)" },
  { codigo: "31506046", descricao: "Nefrectomia laparoscópica em doador vivo", secao: "Renal (3.15.06.00-3)" },
  { codigo: "31506011", descricao: "Transplante renal (receptor)", secao: "Renal (3.15.06.00-3)" },
  { codigo: "31507026", descricao: "Transplante pancreático (doador)", secao: "Pancreático (3.15.07.00-0)" },
  { codigo: "31507018", descricao: "Transplante pancreático (receptor)", secao: "Pancreático (3.15.07.00-0)" },
  { codigo: "31601014", descricao: "Acupuntura por sessão", secao: "Acupuntura (3.16.01.00-6)" },
  { codigo: "31602010", descricao: "Analgesia controlada pelo paciente - por dia subsequente", secao: "Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares (3.16.02.00-2)" },
  { codigo: "31602029", descricao: "Analgesia por dia subsequente. Acompanhamento de", secao: "Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares (3.16.02.00-2)" },
  { codigo: "31602037", descricao: "Anestesia geral ou condutiva para realização de bloqueio", secao: "Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares (3.16.02.00-2)" },
  { codigo: "31602231", descricao: "Anestesia para endoscopia diagnóstica", secao: "Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares (3.16.02.00-2)" },
  { codigo: "31602240", descricao: "Anestesia para endoscopia intervencionista", secao: "Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares (3.16.02.00-2)" },
  { codigo: "31602282", descricao: "Anestesia para exames de ressonância magnética", secao: "Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares (3.16.02.00-2)" },
  { codigo: "31602258", descricao: "Anestesia para exames radiológicos de angiorradiologia", secao: "Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares (3.16.02.00-2)" },
  { codigo: "31602312", descricao: "Anestesia para procedimentos clínicos", secao: "Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares (3.16.02.00-2)" },
  { codigo: "31602320", descricao: "Anestesia para procedimentos de medicina nuclear", secao: "Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares (3.16.02.00-2)" },
  { codigo: "31602290", descricao: "Anestesia para procedimentos de radioterapia", secao: "Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares (3.16.02.00-2)" },
  { codigo: "31602045", descricao: "Bloqueio anestésico de nervos cranianos", secao: "Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares (3.16.02.00-2)" },
  { codigo: "31602053", descricao: "Bloqueio anestésico de plexo celíaco", secao: "Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares (3.16.02.00-2)" },
  { codigo: "31602339", descricao: "Bloqueio anestésico de plexos nervosos (lombossacro,", secao: "Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares (3.16.02.00-2)" },
  { codigo: "31602061", descricao: "Bloqueio anestésico de simpático lombar", secao: "Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares (3.16.02.00-2)" },
  { codigo: "31602070", descricao: "Bloqueio anestésico simpático", secao: "Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares (3.16.02.00-2)" },
  { codigo: "31602088", descricao: "Bloqueio de articulação têmporo-mandibular", secao: "Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares (3.16.02.00-2)" },
  { codigo: "31602096", descricao: "Bloqueio de gânglio estrelado com anestésico local", secao: "Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares (3.16.02.00-2)" },
  { codigo: "31602100", descricao: "Bloqueio de gânglio estrelado com neurolítico", secao: "Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares (3.16.02.00-2)" },
  { codigo: "31602118", descricao: "Bloqueio de nervo periférico", secao: "Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares (3.16.02.00-2)" },
  { codigo: "31602126", descricao: "Bloqueio facetário para-espinhoso", secao: "Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares (3.16.02.00-2)" },
  { codigo: "31602134", descricao: "Bloqueio neurolítico de nervos cranianos ou cérvico-torácico", secao: "Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares (3.16.02.00-2)" },
  { codigo: "31602142", descricao: "Bloqueio neurolítico do plexo celíaco, simpático", secao: "Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares (3.16.02.00-2)" },
  { codigo: "31602150", descricao: "Bloqueio neurolítico peridural ou subaracnóideo", secao: "Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares (3.16.02.00-2)" },
  { codigo: "31602169", descricao: "Bloqueio peridural ou subaracnóideo com corticóide", secao: "Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares (3.16.02.00-2)" },
  { codigo: "31602177", descricao: "Bloqueio simpático por via venosa", secao: "Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares (3.16.02.00-2)" },
  { codigo: "31602185", descricao: "Estimulação elétrica transcutânea", secao: "Bloqueios Anestésicos De Nervos E Estímulos Neurovasculares (3.16.02.00-2)" },
  { codigo: "31602207", descricao: "Instalação de bomba de infusão para analgesia em dor", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31602215", descricao: "Laser - por sessão", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "31602223", descricao: "Passagem de catéter peridural ou subaracnóideo com", secao: "Procedimentos Cirúrgicos E Invasivos" },
  { codigo: "40101010", descricao: "ECG convencional de até 12 derivações", secao: "Ecg - Te (4.01.01.00-2)" },
  { codigo: "40101029", descricao: "ECG de alta resolução", secao: "Ecg - Te (4.01.01.00-2)" },
  { codigo: "40101061", descricao: "Ergoespirometria ou teste cardiopulmonar de exercício completo (espirometria", secao: "Ecg - Te (4.01.01.00-2)" },
  { codigo: "40101037", descricao: "Teste ergométrico computadorizado (inclui ECG basal convencional)", secao: "Ecg - Te (4.01.01.00-2)" },
  { codigo: "40101045", descricao: "Teste ergométrico convencional - 3 ou mais derivações simultâneas", secao: "Ecg - Te (4.01.01.00-2)" },
  { codigo: "40102017", descricao: "Bilimetria gástrica ou esofágica de 24 horas", secao: "Tubo Digestivo (4.01.02.00-9)" },
  { codigo: "40102025", descricao: "Manometria computadorizada anorretal", secao: "Tubo Digestivo (4.01.02.00-9)" },
  { codigo: "40102033", descricao: "Manometria computadorizada anorretal para biofeedback - 1ª sessão", secao: "Tubo Digestivo (4.01.02.00-9)" },
  { codigo: "40102041", descricao: "Manometria computadorizada anorretal para biofeedback - demais sessões", secao: "Tubo Digestivo (4.01.02.00-9)" },
  { codigo: "40102050", descricao: "Manometria esofágica computadorizada com teste provocativo", secao: "Tubo Digestivo (4.01.02.00-9)" },
  { codigo: "40102068", descricao: "Manometria esofágica computadorizada sem teste provocativo", secao: "Tubo Digestivo (4.01.02.00-9)" },
  { codigo: "40102076", descricao: "Manometria esofágica para localização dos esfíncteres pré-pH-metria", secao: "Tubo Digestivo (4.01.02.00-9)" },
  { codigo: "40102092", descricao: "pH-metria esofágica computadorizada com dois canais", secao: "Tubo Digestivo (4.01.02.00-9)" },
  { codigo: "40102106", descricao: "pH-metria esofágica computadorizada com três canais", secao: "Tubo Digestivo (4.01.02.00-9)" },
  { codigo: "40102084", descricao: "pH-metria esofágica computadorizada com um canal", secao: "Tubo Digestivo (4.01.02.00-9)" },
  { codigo: "40103013", descricao: "Análise computadorizada da voz", secao: "Sistema Nervoso (4.01.03.00-5)" },
  { codigo: "40103030", descricao: "Análise computadorizada do segmento anterior - monocular", secao: "Sistema Nervoso (4.01.03.00-5)" },
  { codigo: "40103048", descricao: "Audiometria (tipo Von Bekesy)", secao: "Sistema Nervoso (4.01.03.00-5)" },
  { codigo: "40103064", descricao: "Audiometria de tronco cerebral (PEA) BERA", secao: "Sistema Nervoso (4.01.03.00-5)" },
  { codigo: "40103072", descricao: "Audiometria tonal limiar com testes de discriminação", secao: "Sistema Nervoso (4.01.03.00-5)" },
  { codigo: "40103080", descricao: "Audiometria tonal limiar infantil condicionada (qualquer técnica) - Peep-show", secao: "Sistema Nervoso (4.01.03.00-5)" },
  { codigo: "40103099", descricao: "Audiometria vocal - pesquisa de limiar de discriminação", secao: "Sistema Nervoso (4.01.03.00-5)" },
  { codigo: "40103102", descricao: "Audiometria vocal - pesquisa de limiar de inteligibilidade", secao: "Sistema Nervoso (4.01.03.00-5)" },
  { codigo: "40103110", descricao: "Audiometria vocal com mensagem competitiva (SSI, SSW)", secao: "Sistema Nervoso (4.01.03.00-5)" },
  { codigo: "40103137", descricao: "Campimetria computadorizada - monocular", secao: "Sistema Nervoso (4.01.03.00-5)" },
  { codigo: "40103170", descricao: "EEG de rotina", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103188", descricao: "EEG intra-operatório para monitorização cirúrgica (EEG/IO) - por hora de monitorização", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103196", descricao: "EEGQ quantitativo (mapeamento cerebral)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103234", descricao: "Eletrencefalograma em vigília, e sono espontâneo ou induzido", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103200", descricao: "Eletrencefalograma especial: terapia intensiva, morte encefálica,", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103374", descricao: "EMG com registro de movimento involuntário (teste dinâmico de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103382", descricao: "EMG para monitoração de quimodenervação (por sessão)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103412", descricao: "Gustometria", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103420", descricao: "Imitanciometria de alta frequência", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103439", descricao: "Impedanciometria", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103447", descricao: "Método de Proetz (por sessão)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103455", descricao: "Otoemissões acústicas produto de distorção", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103463", descricao: "Otoemissões evocadas transientes", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103480", descricao: "Pesquisa de pares cranianos relacionados com o VIII PAR", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103501", descricao: "Pesquisa do fenômeno de Tullio", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103536", descricao: "Polissonograma com EEG de noite inteira", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103544", descricao: "Polissonograma com teste de CPAP nasal", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103560", descricao: "Potencial evocado - P300", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103579", descricao: "Potencial evocado auditivo de média latência (PEA-ML) bilateral", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103498", descricao: "Potencial evocado auditivo de tronco cerebral (PEA-TC)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103056", descricao: "Potencial evocado estacionário (Steady State)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103595", descricao: "Potencial evocado gênito-cortical (PEGC)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103609", descricao: "Potencial evocado motor - PEM (bilateral)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103617", descricao: "Potencial evocado somato-sensitivo - membros inferiores (PESS)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103625", descricao: "Potencial evocado somato-sensitivo - membros superiores", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103633", descricao: "Potencial evocado visual (PEV)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103587", descricao: "Potencial somato-sensitivo para localização funcional da área", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103889", descricao: "Processamento auditivo central infantil (03 a 07 anos)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103897", descricao: "Processamento auditivo central (acima de 07 anos)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103641", descricao: "Provas de função tubária", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103650", descricao: "Registro do nistagmo pendular", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103668", descricao: "Rinomanometria computadorizada", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103676", descricao: "Rinometria acústica", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103714", descricao: "Teste de estimulação repetitiva (um ou mais músculos)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103730", descricao: "Teste de latências múltiplas de sono (TLMS) diurno pós PSG", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40103145", descricao: "Variação de contingente negativo (PE/Tardio)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40104010", descricao: "Avaliação muscular por dinamometria computadorizada (isocinética) -", secao: "Exames Ósteo - Músculo - Articulares (4.01.04.00-1)" },
  { codigo: "40104028", descricao: "Cronaximetria", secao: "Exames Ósteo - Músculo - Articulares (4.01.04.00-1)" },
  { codigo: "40104036", descricao: "Curva I/T - medida de latência de nervo periférico", secao: "Exames Ósteo - Músculo - Articulares (4.01.04.00-1)" },
  { codigo: "40104044", descricao: "Ergotonometria músculo-esquelético (tetra, paraparesia e hemiparesia)", secao: "Exames Ósteo - Músculo - Articulares (4.01.04.00-1)" },
  { codigo: "40104125", descricao: "Sistema tridimensional de avaliação do movimento que inclui", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40105016", descricao: "Determinação das pressões respiratórias máximas", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40105024", descricao: "Determinação dos volumes pulmonares por diluição de gases", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40105040", descricao: "Medida da difusão do monóxido de carbono", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40105075", descricao: "Prova de função pulmonar completa (ou espirometria)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40105083", descricao: "Resistência das vias aéreas por oscilometria", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40201015", descricao: "Amnioscopia", secao: "Endoscopia Diagnóstica (4.02.01.00-7)" },
  { codigo: "40201023", descricao: "Anuscopia (interna e externa)", secao: "Endoscopia Diagnóstica (4.02.01.00-7)" },
  { codigo: "40201309", descricao: "Avaliação endoscópica da deglutição (FEES)", secao: "Endoscopia Diagnóstica (4.02.01.00-7)" },
  { codigo: "40201031", descricao: "Broncoscopia com biópsia transbrônquica", secao: "Endoscopia Diagnóstica (4.02.01.00-7)" },
  { codigo: "40201058", descricao: "Broncoscopia com ou sem aspirado ou lavado brônquico bilateral", secao: "Endoscopia Diagnóstica (4.02.01.00-7)" },
  { codigo: "40201066", descricao: "Cistoscopia e/ou uretroscopia", secao: "Endoscopia Diagnóstica (4.02.01.00-7)" },
  { codigo: "40201082", descricao: "Colonoscopia (inclui a retossigmoidoscopia)", secao: "Endoscopia Diagnóstica (4.02.01.00-7)" },
  { codigo: "40201104", descricao: "Ecoendoscopia alta", secao: "Endoscopia Diagnóstica (4.02.01.00-7)" },
  { codigo: "40201112", descricao: "Ecoendoscopia baixa", secao: "Endoscopia Diagnóstica (4.02.01.00-7)" },
  { codigo: "40201120", descricao: "Endoscopia digestiva alta", secao: "Endoscopia Diagnóstica (4.02.01.00-7)" },
  { codigo: "40201333", descricao: "Endoscopia digestiva alta com cromoscopia", secao: "Endoscopia Diagnóstica (4.02.01.00-7)" },
  { codigo: "40201147", descricao: "Enteroscopia", secao: "Endoscopia Diagnóstica (4.02.01.00-7)" },
  { codigo: "40201341", descricao: "Enteroscopia do intestino delgado com cápsula endoscópica", secao: "Endoscopia Diagnóstica (4.02.01.00-7)" },
  { codigo: "40201155", descricao: "Histeroscopia diagnóstica com biópsia", secao: "Endoscopia Diagnóstica (4.02.01.00-7)" },
  { codigo: "40201163", descricao: "Laparoscopia", secao: "Endoscopia Diagnóstica (4.02.01.00-7)" },
  { codigo: "40201317", descricao: "Medida de pressão de varizes de esôfago endoscópica", secao: "Endoscopia Diagnóstica (4.02.01.00-7)" },
  { codigo: "40201180", descricao: "Retossigmoidoscopia rígida", secao: "Endoscopia Diagnóstica (4.02.01.00-7)" },
  { codigo: "40201287", descricao: "Ureteroscopia rígida unilateral", secao: "Endoscopia Diagnóstica (4.02.01.00-7)" },
  { codigo: "40201201", descricao: "Vídeo-endoscopia do esfíncter velo-palatino com ótica rígida", secao: "Endoscopia Diagnóstica (4.02.01.00-7)" },
  { codigo: "40201228", descricao: "Vídeo-endoscopia naso-sinusal com ótica rígida", secao: "Endoscopia Diagnóstica (4.02.01.00-7)" },
  { codigo: "40201260", descricao: "Vídeo-faringo-laringoscopia com endoscópio rígido", secao: "Endoscopia Diagnóstica (4.02.01.00-7)" },
  { codigo: "40201244", descricao: "Vídeo-laringo-estroboscopia com endoscópio rígido", secao: "Endoscopia Diagnóstica (4.02.01.00-7)" },
  { codigo: "40202011", descricao: "Aritenoidectomia microcirúrgica endoscópica", secao: "Endoscopia Intervencionista (4.02.02.00-3)" },
  { codigo: "40202046", descricao: "Biópsias por laparoscopia", secao: "Endoscopia Intervencionista (4.02.02.00-3)" },
  { codigo: "40202054", descricao: "Broncoscopia com biópsia transbrônquica com acompanhamento", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202062", descricao: "Cecostomia", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202070", descricao: "Cistoenterostomia com colocação de prótese ou dreno", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202089", descricao: "Colagem de fístula por via endoscópica", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202097", descricao: "Colocação de cânula sob orientação endoscópica", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202100", descricao: "Colocação de cateter para braquiterapia endobrônquica", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202119", descricao: "Colocação de prótese coledociana por via endoscópica", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202127", descricao: "Colocação de prótese traqueal ou brônquica", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202666", descricao: "Colonoscopia com biópsia e/ou citologia", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202674", descricao: "Colonoscopia com dilatação segmentar", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202704", descricao: "Colonoscopia com estenostomia", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202712", descricao: "Colonoscopia com mucosectomia", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202755", descricao: "Colonoscopia com tratamento de fístula", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202143", descricao: "Descompressão colônica por colonoscopia", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202151", descricao: "Desobstrução brônquica com laser ou eletrocautério", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202160", descricao: "Desobstrução brônquica por broncoaspiração", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202178", descricao: "Dilatação de estenose laringo-traqueo-brônquica", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202186", descricao: "Dilatação instrumental do esôfago, estômago ou duodeno", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202194", descricao: "Dilatação instrumental e injeção de substância medicamentosa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202208", descricao: "Diverticulotomia", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202216", descricao: "Drenagem cavitária por laparoscopia", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202224", descricao: "Ecoendoscopia com cistoenterostomia", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202232", descricao: "Ecoendoscopia com neurólise de plexo celíaco", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202240", descricao: "Ecoendoscopia com punção por agulha", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202615", descricao: "Endoscopia digestiva alta com biópsia e teste de urease", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202038", descricao: "Endoscopia digestiva alta com biópsia e/ou citologia", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202747", descricao: "Endoscopia digestiva alta com cromoscopia e biópsia e/ou citologia", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202259", descricao: "Esclerose de varizes de esôfago, estômago ou duodeno", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202267", descricao: "Estenostomia endoscópica", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202283", descricao: "Gastrostomia endoscópica", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202291", descricao: "Hemostasia mecânica do esôfago, estômago ou duodeno", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202305", descricao: "Hemostasia térmica por endoscopia", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202313", descricao: "Hemostasias de cólon", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202330", descricao: "Injeção de substância medicamentosa por endoscopia", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202348", descricao: "Introdução de prótese no esôfago", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202356", descricao: "Jejunostomia endoscópica", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202364", descricao: "Laringoscopia com microscopia para exérese de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202372", descricao: "Laringoscopia com retirada de corpo estranho de laringe/faringe", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202399", descricao: "Laringoscopia/traqueoscopia com exérese de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202763", descricao: "Laringoscopia/traqueoscopia com laser para exérese de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202429", descricao: "Laringoscopia/traqueoscopia para diagnóstico e biópsia (tubo rígido)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202437", descricao: "Laringoscopia/traqueoscopia para diagnóstico e biópsia com", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202445", descricao: "Laringoscopia/traqueoscopia para intubação oro ou nasotraqueal", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202453", descricao: "Ligadura elástica do esôfago, estômago ou duodeno", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202470", descricao: "Mucosectomia", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202496", descricao: "Papilotomia biópsia e/ou citologia biliar e pancreática", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202500", descricao: "Papilotomia e dilatação biliar ou pancreática", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202518", descricao: "Papilotomia endoscópica (para retirada de cálculos coledocianos", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202526", descricao: "Papilotomia, dilatação e colocação de prótese ou dreno biliar ou", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202534", descricao: "Passagem de sonda naso-enteral", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202542", descricao: "Polipectomia de cólon (independente do número de pólipos)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202550", descricao: "Polipectomia do esôfago, estômago ou duodeno (independente do", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202569", descricao: "Retirada de corpo estranho do cólon", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202577", descricao: "Retirada de corpo estranho do esôfago, estômago ou duodeno", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202585", descricao: "Retirada de corpo estranho no brônquio ou brônquico", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202593", descricao: "Retirada de tumor ou papiloma por broncoscopia", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202720", descricao: "Retossigmoidoscopia rígida com biópsia e/ou citologia", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202739", descricao: "Retossigmoidoscopia rígida com polipectomia", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202607", descricao: "Tamponamento de varizes do esôfago e estômago", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202623", descricao: "Traqueostomia por punção percutânea", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202631", descricao: "Tratamento endoscópico de hemoptise", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40202640", descricao: "Uretrotomia endoscópica", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301036", descricao: "Acetaminofen, dosagem", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301044", descricao: "Acetilcolinesterase, em eritrócitos, dosagem", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301052", descricao: "Acetona, dosagem no soro", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301060", descricao: "Ácido ascórbico (vitamina C), dosagem", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301079", descricao: "Ácido beta hidroxi butírico, dosagem", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301087", descricao: "Ácido fólico, dosagem nos eritrócitos", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301095", descricao: "Ácido glioxílico, pesquisa e/ou dosagem", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301109", descricao: "Ácido láctico (lactato), dosagem", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301117", descricao: "Ácido orótico, dosagem", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301125", descricao: "Ácido oxálico, dosagem", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301133", descricao: "Ácido pirúvico, dosagem", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301141", descricao: "Ácido siálico, dosagem", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301150", descricao: "Ácido úrico, dosagem", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301168", descricao: "Ácido valpróico, dosagem", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301176", descricao: "Ácidos biliares, dosagem", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301184", descricao: "Ácidos graxos livres, dosagem", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301222", descricao: "Albumina, dosagem", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301230", descricao: "Aldolase, dosagem", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301249", descricao: "Alfa-1-antitripsina, dosagem no soro", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301257", descricao: "Alfa-1-glicoproteína ácida, dosagem", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301265", descricao: "Alfa-2-macroglobulina, dosagem", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301273", descricao: "Alumínio, dosagem no soro", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40302130", descricao: "Amilase ou alfa-amilase, isoenzimas, dosagem", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301281", descricao: "Amilase, dosagem", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301303", descricao: "Amiodarona, dosagem", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301311", descricao: "Amitriptilina, nortriptilina (cada), dosagem", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301320", descricao: "Amônia, dosagem", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301338", descricao: "Anfetaminas, dosagem", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301346", descricao: "Antibióticos, dosagem no soro, cada", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301354", descricao: "Apolipoproteína A (Apo A), dosagem", secao: "Bioquímica (4.03.01.00-1)" },
  { codigo: "40301362", descricao: "Apolipoproteína B (Apo B), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301370", descricao: "Barbitúricos, antidepressivos tricíclicos (cada), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301745", descricao: "Benzodiazepínicos e similares (cada), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301389", descricao: "Beta-glicuronidase, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301397", descricao: "Bilirrubinas (direta, indireta e total), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301419", descricao: "Cálcio iônico, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301400", descricao: "Cálcio, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301435", descricao: "Carbamazepina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301443", descricao: "Carnitina livre, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301451", descricao: "Carnitina total e frações, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301460", descricao: "Caroteno, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301478", descricao: "Ceruloplasmina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301486", descricao: "Ciclosporina, methotrexate - cada, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301494", descricao: "Clearance de ácido úrico", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301508", descricao: "Clearance de creatinina", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301516", descricao: "Clearance de fosfato", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301524", descricao: "Clearance de uréia", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301532", descricao: "Clearance osmolar", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301540", descricao: "Clomipramina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301559", descricao: "Cloro, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301567", descricao: "Cobre, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301575", descricao: "Cocaína, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301583", descricao: "Colesterol (HDL), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301591", descricao: "Colesterol (LDL), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302695", descricao: "Colesterol (VLDL), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301605", descricao: "Colesterol total, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301613", descricao: "Cotinina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301621", descricao: "Creatina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301630", descricao: "Creatinina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301664", descricao: "Creatino fosfoquinase - fração MB - atividade, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301656", descricao: "Creatino fosfoquinase - fração MB - massa, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301648", descricao: "Creatino fosfoquinase total (CK), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301680", descricao: "Curva glicêmica (4 dosagens) via oral ou endovenosa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301699", descricao: "Desidrogenase alfa-hidroxibutírica, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301702", descricao: "Desidrogenase glutâmica, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301710", descricao: "Desidrogenase isocítrica, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301737", descricao: "Desidrogenase láctica - isoenzimas fracionadas, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301729", descricao: "Desidrogenase láctica, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301753", descricao: "Digitoxina ou digoxina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301770", descricao: "Eletroforese de glicoproteínas", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301788", descricao: "Eletroforese de lipoproteínas", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301761", descricao: "Eletroferese de proteínas", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302717", descricao: "Eletroforese de proteínas de alta resolução", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301796", descricao: "Enolase, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301800", descricao: "Etossuximida, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301818", descricao: "Fenilalanina, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301826", descricao: "Fenitoína, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301834", descricao: "Fenobarbital, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301842", descricao: "Ferro sérico, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301850", descricao: "Formaldeído, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301877", descricao: "Fosfatase ácida total, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301869", descricao: "Fosfatase ácida, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301893", descricao: "Fosfatase alcalina com fracionamento de isoenzimas, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301907", descricao: "Fosfatase alcalina fração óssea - Elisa, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301915", descricao: "Fosfatase alcalina termo-estável, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301885", descricao: "Fosfatase alcalina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301923", descricao: "Fosfolipídios, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301931", descricao: "Fósforo, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301940", descricao: "Fósforo, prova de reabsorção tubular, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301958", descricao: "Frutosaminas (proteínas glicosiladas), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301966", descricao: "Frutose, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301982", descricao: "Galactose 1-fosfatouridil transferase, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301974", descricao: "Galactose, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40301990", descricao: "Gama-glutamil transferase, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302016", descricao: "Gasometria (pH, pCO2, SA, O2, excesso base), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302024", descricao: "Gasometria + Hb + Ht + Na + K + Cl + Ca + glicose + lactato", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302032", descricao: "Glicemia após sobrecarga com dextrosol ou glicose, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302040", descricao: "Glicose, glicose", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302059", descricao: "Glicose-6-fosfato deidrogenase (G6FD), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302067", descricao: "Haptoglobina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302075", descricao: "Hemoglobina glicada (A1 total), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302733", descricao: "Hemoglobina glicada (Fração A1c), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302083", descricao: "Hemoglobina plasmática livre, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302091", descricao: "Hexosaminidase A, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302105", descricao: "Hidroxiprolina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302113", descricao: "Homocisteína, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302121", descricao: "Imipramina - desipramina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302148", descricao: "Isomerase fosfohexose, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302156", descricao: "Isoniazida, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302164", descricao: "Lactose, teste de tolerância", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302741", descricao: "Lamotrigina, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302172", descricao: "Leucino aminopeptidase, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302180", descricao: "Lidocaina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302202", descricao: "Lipase lipoprotéica, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302199", descricao: "Lipase, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302636", descricao: "Lipídios totais, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302210", descricao: "Lipoproteína (a) - Lp (a), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302229", descricao: "Lítio, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302237", descricao: "Magnésio, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302644", descricao: "Maltose, teste de tolerância", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302245", descricao: "Mioglobina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302652", descricao: "Mucopolissacaridose, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302253", descricao: "Nitrogênio amoniacal, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302261", descricao: "Nitrogênio total, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302679", descricao: "Ocitocinase, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302270", descricao: "Osmolalidade, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302288", descricao: "Oxcarbazepina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302768", descricao: "PAPP-A, dosagem e/ou pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302776", descricao: "Peptídeo natriurético BNP/PROBNP, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302296", descricao: "Piruvato quinase, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302318", descricao: "Potássio, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302326", descricao: "Pré-albumina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302334", descricao: "Primidona, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302342", descricao: "Procainamida, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302687", descricao: "Procalcitonina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302350", descricao: "Propanolol, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302369", descricao: "Proteína ligadora do retinol, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302377", descricao: "Proteínas totais", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302385", descricao: "Proteínas totais albumina e globulina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302393", descricao: "Quinidina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302407", descricao: "Reserva alcalina (bicarbonato), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302415", descricao: "Sacarose, teste de tolerância", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302423", descricao: "Sódio, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302431", descricao: "Succinil acetona, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302440", descricao: "Sulfonamidas livre e acetilada (% de acetilação), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302458", descricao: "Tacrolimus, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302466", descricao: "Tálio, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302482", descricao: "Teste de tolerância a insulina ou hipoglicemiantes orais", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302709", descricao: "Teste oral de tolerância à glicose - 2 dosagens", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302490", descricao: "Tirosina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302504", descricao: "Transaminase oxalacética (amino transferase aspartato), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302512", descricao: "Transaminase pirúvica (amino transferase de alanina), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302520", descricao: "Transferrina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302539", descricao: "Triazolam, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302547", descricao: "Triglicerídeos, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302555", descricao: "Trimipramina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302563", descricao: "Tripsina imuno reativa (IRT), pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302571", descricao: "Troponina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302580", descricao: "Uréia, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302598", descricao: "Urobilinogênio, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302830", descricao: "Vitamina “D” 25 HIDROXI (Vitamina D3), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302601", descricao: "Vitamina A, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302784", descricao: "Vitamina B1, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302792", descricao: "Vitamina B2, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302806", descricao: "Vitamina B3, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302814", descricao: "Vitamina B6, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302822", descricao: "Vitamina D2, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302610", descricao: "Vitamina E, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302849", descricao: "Vitamina K, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40302628", descricao: "Xilose, teste de absorção à", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40303012", descricao: "Alfa-1-antitripsina, (fezes), pesquisa e/ou dosagem", secao: "Coprologia (4.03.03.00-4)" },
  { codigo: "40303020", descricao: "Anal Swab, pesquisa de oxiúrus", secao: "Coprologia (4.03.03.00-4)" },
  { codigo: "40303039", descricao: "Coprológico funcional (caracteres, pH, digestibilidade, amônia, ácidos", secao: "Coprologia (4.03.03.00-4)" },
  { codigo: "40303179", descricao: "Esteatócrito, triagem para gordura fecal", secao: "Coprologia (4.03.03.00-4)" },
  { codigo: "40303187", descricao: "Estercobilinogênio fecal, dosagem", secao: "Coprologia (4.03.03.00-4)" },
  { codigo: "40303055", descricao: "Gordura fecal, dosagem", secao: "Coprologia (4.03.03.00-4)" },
  { codigo: "40303063", descricao: "Hematoxilina férrica, pesquisa de protozoários nas fezes", secao: "Coprologia (4.03.03.00-4)" },
  { codigo: "40303080", descricao: "Larvas (fezes), pesquisa", secao: "Coprologia (4.03.03.00-4)" },
  { codigo: "40303098", descricao: "Leucócitos e hemácias, pesquisa nas fezes", secao: "Coprologia (4.03.03.00-4)" },
  { codigo: "40303101", descricao: "Leveduras, pesquisa nas fezes", secao: "Coprologia (4.03.03.00-4)" },
  { codigo: "40303110", descricao: "Parasitológico nas fezes", secao: "Coprologia (4.03.03.00-4)" },
  { codigo: "40303128", descricao: "Parasitológico, colheita múltipla com fornecimento do líquido", secao: "Coprologia (4.03.03.00-4)" },
  { codigo: "40303136", descricao: "Sangue oculto, pesquisa nas fezes", secao: "Coprologia (4.03.03.00-4)" },
  { codigo: "40303144", descricao: "Shistossoma, pesquisa ovos em fragmentos mucosa após", secao: "Coprologia (4.03.03.00-4)" },
  { codigo: "40303152", descricao: "Substâncias redutoras nas fezes, pesquisa", secao: "Coprologia (4.03.03.00-4)" },
  { codigo: "40303160", descricao: "Tripsina, prova de (digestão da gelatina)", secao: "Coprologia (4.03.03.00-4)" },
  { codigo: "40304663", descricao: "Alfa-2-antiplasmina, teste funcional", secao: "Hematologia Laboratorial (4.03.04.00-0)" },
  { codigo: "40319318", descricao: "Análise de multímetros para pacientes com doença de Von Willebrand", secao: "Hematologia Laboratorial (4.03.04.00-0)" },
  { codigo: "40304019", descricao: "Anticoagulante lúpico, pesquisa", secao: "Hematologia Laboratorial (4.03.04.00-0)" },
  { codigo: "40304027", descricao: "Anticorpo anti A e B, pesquisa e/ou dosagem", secao: "Hematologia Laboratorial (4.03.04.00-0)" },
  { codigo: "40304671", descricao: "Anticorpo antimieloperoxidase, MPO, dosagem", secao: "Hematologia Laboratorial (4.03.04.00-0)" },
  { codigo: "40304051", descricao: "Anticorpos irregulares, pesquisa (meio salino a temperatura", secao: "Hematologia Laboratorial (4.03.04.00-0)" },
  { codigo: "40304043", descricao: "Anticorpos irregulares, pesquisa e/ou dosagem", secao: "Hematologia Laboratorial (4.03.04.00-0)" },
  { codigo: "40304060", descricao: "Antitrombina III, dosagem", secao: "Hematologia Laboratorial (4.03.04.00-0)" },
  { codigo: "40304078", descricao: "Ativador tissular de plasminogênio (TPA), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304930", descricao: "Baço, exame de esfregaço de aspirado", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304795", descricao: "Células LE, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304922", descricao: "Coagulograma (TS, TC, prova do laço, retração do coágulo, contagem de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304809", descricao: "Consumo de protrombina", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304108", descricao: "Coombs direto", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304884", descricao: "Coombs indireto", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304906", descricao: "Dímero D, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304116", descricao: "Enzimas eritrocitárias, (adenilatoquinase, desidrogenase láctica,", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304825", descricao: "Esplenograma (citologia)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304868", descricao: "Estreptozima, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304132", descricao: "Falcização, teste de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304140", descricao: "Fator 4 plaquetário, dosagens", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304159", descricao: "Fator II, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304167", descricao: "Fator IX, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304752", descricao: "Fator IX, dosagem do inibidor", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304175", descricao: "Fator V, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304680", descricao: "Fator VII, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304183", descricao: "Fator VIII, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304191", descricao: "Fator VIII, dosagem do antígeno (Von Willebrand)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304205", descricao: "Fator VIII, dosagem do inibidor", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304213", descricao: "Fator X, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304221", descricao: "Fator XI, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304230", descricao: "Fator XII, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304698", descricao: "Fator XIII, dosagem, teste funcional", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304248", descricao: "Fator XIII, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304256", descricao: "Fenotipagem do sistema Rh-Hr (anti Rho(D) + anti Rh(C) + anti Rh(E)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304264", descricao: "Fibrinogênio, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304272", descricao: "Filária, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304299", descricao: "Grupo sanguíneo ABO, e fator Rho (inclui Du), determinação", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304302", descricao: "Ham, teste de (hemólise ácida)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304310", descricao: "Heinz, corpúsculos, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304329", descricao: "Hemácias fetais, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304337", descricao: "Hematócrito, determinação do", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304353", descricao: "Hemoglobina (eletroforese ou HPLC)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304833", descricao: "Hemoglobina instabilidade a 37 graus C", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304345", descricao: "Hemoglobina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304841", descricao: "Hemoglobina, solubilidade (HbS e HbD), pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304850", descricao: "Hemoglobinopatia - triagem (El.HB., hemoglob. fetal reticulócitos,", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304361", descricao: "Hemograma com contagem de plaquetas ou frações (eritrograma,", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304370", descricao: "Hemossedimentação, (VHS), velocidade", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304388", descricao: "Hemossiderina (siderócitos), sangue ou urina, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304396", descricao: "Heparina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304701", descricao: "Imunofenotipagem para doença residual mínima (*)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304710", descricao: "Imunofenotipagem para hemoglobinúria paroxistica noturna (*)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304728", descricao: "Imunofenotipagem para leucemias agudas ou síndrome mielodisplásica (*)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304736", descricao: "Imunofenotipagem para linfoma não Hodgkin / síndrome linfoproliferativa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304400", descricao: "Inibidor do TPA (PAI), pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304760", descricao: "Inibidor dos fatores da hemostasia, triagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304418", descricao: "Leucócitos, contagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304949", descricao: "Linfonodo, exame de esfregaço de aspirado", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304485", descricao: "Medula óssea, aspiração para mielograma ou microbiológico", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304434", descricao: "Meta-hemoglobina, determinação da", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304892", descricao: "Mielograma", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304450", descricao: "Plaquetas, teste de agregação (por agente agregante), cada", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304469", descricao: "Plasminogênio, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304477", descricao: "Plasmódio, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304507", descricao: "Proteína C, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304787", descricao: "Proteína S livre, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304515", descricao: "Proteína S, teste funcional", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40319326", descricao: "Protrombina, pesquisa de mutação", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304531", descricao: "Prova do laço", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304540", descricao: "Resistência globular, curva de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304558", descricao: "Reticulócitos, contagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304566", descricao: "Retração do coágulo", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304574", descricao: "Ristocetina, co-fator, teste funcional, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304876", descricao: "Sulfo-hemoglobina, determinação da", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304582", descricao: "Tempo de coagulação, determinação", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40319270", descricao: "Tempo de lise de euglobulina", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304590", descricao: "Tempo de protrombina, determinação", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304604", descricao: "Tempo de reptilase, determinação", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304914", descricao: "Tempo de sangramento (Duke), determinação", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304612", descricao: "Tempo de sangramento de IVY, determinação", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304620", descricao: "Tempo de trombina, determinação", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304639", descricao: "Tempo de tromboplastina parcial ativada, determinação", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304647", descricao: "Tripanossoma, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40304655", descricao: "Tromboelastograma, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305112", descricao: "Ácido 5 hidróxi indol acético, dosagem na urina", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305120", descricao: "Ácido homo vanílico, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316033", descricao: "Ácido vanilmandélico (VMA)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316050", descricao: "Aldosterona, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316068", descricao: "Alfa-fetoproteína, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305163", descricao: "AMP cíclico, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316076", descricao: "Androstenediona, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316084", descricao: "Anticorpo anti-receptor de TSH (TRAB), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316092", descricao: "Anticorpos antiinsulina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316106", descricao: "Anticorpos antitireóide (tireoglobulina), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316114", descricao: "Antígeno Austrália (HBsAG), pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316122", descricao: "Antígeno carcinoembriogênico (CEA), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316157", descricao: "Anti-TPO, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316165", descricao: "Calcitonina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316173", descricao: "Catecolaminas, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316181", descricao: "Composto S (11-desoxicortisol), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305210", descricao: "Cortisol livre, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316190", descricao: "Cortisol, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316203", descricao: "Crescimento, hormônio do (HGH), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305228", descricao: "Curva glicêmica (6 dosagens), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305236", descricao: "Curva insulínica (6 dosagens), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316211", descricao: "Dehidroepiandrosterona (DHEA), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316220", descricao: "Dehidrotestosterona (DHT), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305279", descricao: "Dosagem de receptor de progesterona ou de estrogênio", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316238", descricao: "Drogas (imunossupressora, anticonvulsivante, digitálico, etc.)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305287", descricao: "Enzima conversora da angiotensina (ECA), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305295", descricao: "Eritropoietina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316246", descricao: "Estradiol, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316254", descricao: "Estriol, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305597", descricao: "Estrogênios totais (fenolesteróides), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316262", descricao: "Estrona, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316270", descricao: "Ferritina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316289", descricao: "Folículo estimulante, hormônio (FSH), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305341", descricao: "Gad-Ab-antidescarboxilase do ácido, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316297", descricao: "Gastrina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316300", descricao: "Globulina de ligação de hormônios sexuais (SHBG), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316319", descricao: "Globulina transportadora da tiroxina (TBG), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305368", descricao: "Glucagon, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305384", descricao: "Hormônio antidiurético (vasopressina), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316335", descricao: "Hormônio luteinizante (LH), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305406", descricao: "IGF BP3 (proteína ligadora dos fatores de crescimento “insulin-like”),", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316343", descricao: "Imunoglobulina (IGE), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316351", descricao: "Índice de tiroxina livre (ITL), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316360", descricao: "Insulina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305600", descricao: "Iodo protéico (PBI), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305619", descricao: "Lactogênico placentário hormônio, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305422", descricao: "Leptina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305775", descricao: "Macroprolactina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316378", descricao: "Marcadores tumorais (CA 19.9, CA 125, CA 72-4, CA 15-3, etc.)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305449", descricao: "N-telopeptídeo, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316386", descricao: "Osteocalcina, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305465", descricao: "Paratormônio - PTH ou fração (cada), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316394", descricao: "Peptídeo C, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305490", descricao: "Piridinolina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305503", descricao: "Pregnandiol, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305511", descricao: "Pregnantriol, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316408", descricao: "Progesterona, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316416", descricao: "Prolactina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305546", descricao: "Prova do LH-Rh, dosagem do FSH sem fornecimento de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305554", descricao: "Prova do LH-Rh, dosagem do LH sem fornecimento de medicamento (cada)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305562", descricao: "Prova do TRH-HPR, dosagem do HPR sem fornecimento do", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305570", descricao: "Prova do TRH-TSH, dosagem do TSH sem fornecimento do material (cada)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305589", descricao: "Prova para diabete insípido (restrição hídrica NaCL 3% vasopressina)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40305627", descricao: "Provas de função tireoideana (T3, T4, índices e TSH)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316424", descricao: "PTH, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316432", descricao: "Renina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316440", descricao: "Somatomedina C (IGF1), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316459", descricao: "Sulfato de dehidroepiandrosterona (S-DHEA), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316467", descricao: "T3 livre, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316475", descricao: "T3 retenção, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316483", descricao: "T3 reverso, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316491", descricao: "T4 livre, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316505", descricao: "Testosterona livre, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316513", descricao: "Testosterona total, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316521", descricao: "Tireoestimulante, hormônio (TSH), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316530", descricao: "Tireoglobulina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316548", descricao: "Tiroxina (T4), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316556", descricao: "Triiodotironina (T3), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316564", descricao: "Vasopressina (ADH), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40316572", descricao: "Vitamina B12, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308901", descricao: "Acetilcolina, anticorpos bloqueador receptor", secao: "Imunologia (4.03.06.00-3)" },
  { codigo: "40323030", descricao: "Acetilcolina, anticorpos ligador receptor", secao: "Imunologia (4.03.06.00-3)" },
  { codigo: "40323048", descricao: "Acetilcolina, anticorpos modulador receptor", secao: "Imunologia (4.03.06.00-3)" },
  { codigo: "40306011", descricao: "Adenovírus, IgG, dosagem", secao: "Imunologia (4.03.06.00-3)" },
  { codigo: "40306020", descricao: "Adenovírus, IgM - dosagem", secao: "Imunologia (4.03.06.00-3)" },
  { codigo: "40308308", descricao: "Amebíase, IgG, dosagem", secao: "Imunologia (4.03.06.00-3)" },
  { codigo: "40308316", descricao: "Amebíase, IgM, dosagem", secao: "Imunologia (4.03.06.00-3)" },
  { codigo: "40308553", descricao: "Anti transglutaminase tecidual - IgA", secao: "Imunologia (4.03.06.00-3)" },
  { codigo: "40306054", descricao: "Anti-actina, dosagem", secao: "Imunologia (4.03.06.00-3)" },
  { codigo: "40306046", descricao: "Anticandida - IgG e IgM (cada), dosagem", secao: "Imunologia (4.03.06.00-3)" },
  { codigo: "40306135", descricao: "Anticardiolipina - IgA, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306143", descricao: "Anticardiolipina - IgG, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306151", descricao: "Anticardiolipina - IgM, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306160", descricao: "Anticentrômero, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308219", descricao: "Anticorpo anti Saccharamyces - ASCA, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306178", descricao: "Anticorpo anti-DNAse B, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306186", descricao: "Anticorpo anti-hormônio do crescimento, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306194", descricao: "Anticorpo antivírus da hepatite E (total), pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40323897", descricao: "Anticorpos antidifteria", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306259", descricao: "Anticorpos antiendomisio - IgG, IgM, IgA (cada), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306208", descricao: "Anticorpos anti-ilhota de langherans, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308529", descricao: "Anticorpos antipneumococos", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40323900", descricao: "Anticorpos antitétano", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306267", descricao: "Anticorpos naturais - isoaglutininas, pesquisas", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306275", descricao: "Anticorpos naturais - isoaglutininas, titulagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306283", descricao: "Anticortex supra-renal, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307930", descricao: "Antidesoxiribonuclease B, neutralização quantitativa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307913", descricao: "Anti-DMP, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306062", descricao: "Anti-DNA, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306291", descricao: "Antiescleroderma (SCL 70), pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307948", descricao: "Antifígado (glomérulo, tub. Renal corte rim de rato), IFI, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307956", descricao: "Antígenos metílicos solúveis do BCG (1 aplicação)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306305", descricao: "Antigliadina (glúten) - IgA, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306313", descricao: "Antigliadina (glúten) - IgG, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306321", descricao: "Antigliadina (glúten) - IgM, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307921", descricao: "Anti-hialuronidase, determinação da", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306070", descricao: "Anti-JO1, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306089", descricao: "Anti-LA/SSB, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306097", descricao: "Anti-LKM-1, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306330", descricao: "Antimembrana basal, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306348", descricao: "Antimicrossomal, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306364", descricao: "Antimitocondria, M2, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306356", descricao: "Antimitocondria, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306372", descricao: "Antimúsculo cardíaco, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306380", descricao: "Antimúsculo estriado, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306399", descricao: "Antimúsculo liso, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306429", descricao: "Antiparietal, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306437", descricao: "Antiperoxidase tireoideana, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306100", descricao: "Anti-RNP, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306119", descricao: "Anti-Ro/SSA, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306127", descricao: "Anti-Sm, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306445", descricao: "Aslo, pesquisa (látex)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308405", descricao: "Aslo, quantitativo, dosagem (turbidimetria ou nefelometria)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306453", descricao: "Aspergilus, reação sorológica", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306461", descricao: "Avidez de IgG para toxoplasmose, citomegalia, rubéloa,", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306470", descricao: "Beta-2-microglobulina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306488", descricao: "Biotinidase atividade da, qualitativo, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306496", descricao: "Blastomicose, reação sorológica", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306500", descricao: "Brucela - IgG, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306518", descricao: "Brucela - IgM, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306526", descricao: "Brucela, prova rápida", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306534", descricao: "C1q, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306542", descricao: "C3 proativador, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306550", descricao: "C3A (fator B), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306569", descricao: "CA 50, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306577", descricao: "CA-242, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306585", descricao: "CA-27-29, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306593", descricao: "Caxumba, IgG, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306607", descricao: "Caxumba, IgM, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306615", descricao: "Chagas IgG, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306623", descricao: "Chagas IgM, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306631", descricao: "Chlamydia - IgG, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306640", descricao: "Chlamydia - IgM, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306658", descricao: "Cisticercose, AC, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306666", descricao: "Citomegalovírus IgG, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306674", descricao: "Citomegalovírus IgM, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306690", descricao: "Complemento C2, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307999", descricao: "Complemento C3, C4 - turbid. ou nefolométrico C3A, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306704", descricao: "Complemento C3, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306712", descricao: "Complemento C4, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306720", descricao: "Complemento C5, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306739", descricao: "Complemento CH-100, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306747", descricao: "Complemento CH-50, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306755", descricao: "Crio-aglutinina, globulina, dosagem, cada", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306763", descricao: "Crio-aglutinina, globulina, pesquisa, cada", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308014", descricao: "Crioglobulinas, caracterização - imunoeletroforese", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306771", descricao: "Cross match (prova cruzada de histocompatibilidade para", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306780", descricao: "Cultura ou estimulação dos linfócitos “in vitro” por concanavalina,", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306798", descricao: "Dengue - IgG e IgM (cada), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308022", descricao: "DNCB - teste de contato", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306801", descricao: "Echovírus (painel) sorologia para", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306810", descricao: "Equinococose (Hidatidose), reação sorológica", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306828", descricao: "Equinococose, IDR", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306836", descricao: "Esporotricose, reação sorológica", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306844", descricao: "Esporotriquina, IDR", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306852", descricao: "Fator antinúcleo, (FAN), pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306860", descricao: "Fator reumatóide, quantitativo, dosagem (turbidimetria, nefelometria)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308030", descricao: "Fator reumatóide, teste do látex (qualitativo), pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306879", descricao: "Filaria sorologia, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308049", descricao: "Frei (linfogranuloma venéreo), IDeR, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306887", descricao: "Genotipagem do sistema HLA", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306895", descricao: "Giardia, reação sorológica", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308324", descricao: "Gonococo - IgG, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308332", descricao: "Gonococo - IgM, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306909", descricao: "Helicobacter pylori - IgA, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306917", descricao: "Helicobacter pylori - IgG, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306925", descricao: "Helicobacter pylori - IgM, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306933", descricao: "Hepatite A - HAV - IgG, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306941", descricao: "Hepatite A - HAV - IgM, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306950", descricao: "Hepatite B - HBCAC - IgG (anti-core IgG ou Acoreg), pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306968", descricao: "Hepatite B - HBCAC - IgM (anti-core IgM ou Acorem), pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306976", descricao: "Hepatite B - HBeAC (anti HBE), pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306984", descricao: "Hepatite B - HBeAG (antígeno “E”), pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40306992", descricao: "Hepatite B - HBsAC (anti-antígeno de superfície), pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307018", descricao: "Hepatite B - HBsAG (AU, antígeno austrália), pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307034", descricao: "Hepatite C - anti-HCV - IgM, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307026", descricao: "Hepatite C - anti-HCV, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307042", descricao: "Hepatite C - imunoblot, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307050", descricao: "Hepatite delta, anticorpo IgG, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307069", descricao: "Hepatite delta, anticorpo IgM, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307077", descricao: "Hepatite delta, antígeno, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40323404", descricao: "Hepatite E - IgM/IgG", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308235", descricao: "HER-2 - dosagem do receptor", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307085", descricao: "Herpes simples - IgG, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307093", descricao: "Herpes simples - IgM, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307107", descricao: "Herpes zoster - IgG, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307115", descricao: "Herpes zoster - IgM, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308081", descricao: "Hidatidose (equinococose) IDi dupla", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307123", descricao: "Hipersensibilidade retardada (intradermo reação IDeR ) candidina, caxumba,", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307131", descricao: "Histamina, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307140", descricao: "Histona, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307158", descricao: "Histoplasmose, reação sorológica", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307166", descricao: "HIV - antígeno P24, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307174", descricao: "HIV1 ou HIV2, pesquisa de anticorpos", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307182", descricao: "HIV1+ HIV2, (determinação conjunta), pesquisa de anticorpos", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307190", descricao: "HLA-DR, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307204", descricao: "HLA-DR+DQ, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307212", descricao: "HTLV1 ou HTLV2 pesquisa de anticorpo (cada)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307239", descricao: "IgA na saliva, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307220", descricao: "IgA, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307247", descricao: "IgD, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307263", descricao: "IgE, por alérgeno (cada), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307271", descricao: "IgE, total, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307280", descricao: "IgG, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307298", descricao: "IgG, subclasses 1,2,3,4 (cada), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307301", descricao: "IgM, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307328", descricao: "Imunocomplexos circulantes, com células Raji, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307310", descricao: "Imunocomplexos circulantes, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307336", descricao: "Imunoeletroforese (estudo da gamopatia), pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307344", descricao: "Inibidor de C1 esterase, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307352", descricao: "Isospora, pesquisa de antígeno", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307360", descricao: "Ito (cancro mole), IDeR", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307379", descricao: "Kveim (sarcoidose), IDeR", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307387", descricao: "Legionella - IgG e IgM (cada), pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307395", descricao: "Leishmaniose - IgG e IgM (cada), pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307409", descricao: "Leptospirose - IgG, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307417", descricao: "Leptospirose - IgM, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307425", descricao: "Leptospirose, aglutinação, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307433", descricao: "Linfócitos T “helper” contagem de (IF com OKT-4) (CD-4+)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307441", descricao: "Linfócitos T supressores contagem de (IF com OKT-8) (D-8)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307450", descricao: "Listeriose, reação sorológica", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307468", descricao: "Lyme - IgG, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307476", descricao: "Lyme - IgM, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307484", descricao: "Malária - IgG, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307492", descricao: "Malária - IgM, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307506", descricao: "Mantoux, IDeR", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307514", descricao: "MCA (antígeno cárcino-mamário), pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307522", descricao: "Micoplasma pneumoniae - IgG, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307530", descricao: "Micoplasma pneumoniae - IgM, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307565", descricao: "Mononucleose - Epstein BARR - IgG, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307573", descricao: "Mononucleose, anti-VCA (EBV) IgG, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307581", descricao: "Mononucleose, anti-VCA (EBV) IgM, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308340", descricao: "Mononucleose, sorologia para (Monoteste ou Paul-Bunnel), cada", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307590", descricao: "Montenegro, IDeR", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308090", descricao: "NBT estimulado", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307603", descricao: "Outros testes bioquímicos para determinação do risco fetal (cada)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308413", descricao: "Paracoccidioidomicose, anticorpos totais / IgG, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307611", descricao: "Parvovírus - IgG, IgM (cada), pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307620", descricao: "Peptídio intestinal vasoativo, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311503", descricao: "Pesquisa de sulfatídeos e material metacromático na urina", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308243", descricao: "Poliomelite sorologia", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307638", descricao: "PPD (tuberculina), IDeR", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308251", descricao: "Proteína Amiloide A, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308391", descricao: "Proteína C reativa, quantitativa, dosagem (turbidimetria, nefelometria)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307654", descricao: "Proteína C, teste imunológico", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307662", descricao: "Proteína eosinofílica catiônica (ECP), pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308375", descricao: "Psitacose - IgA, pesauisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308359", descricao: "Psitacose - IgG, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308367", descricao: "Psitacose - IgM, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307689", descricao: "Reação sorológica para coxsackie, neutralização IgG", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307697", descricao: "Rubéola - IgG, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307700", descricao: "Rubéola - IgM, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308120", descricao: "Sarampo - anticorpos IgG, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308138", descricao: "Sarampo - anticorpos IgM, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307719", descricao: "Schistosomose - IgG, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307727", descricao: "Schistosomose - IgM, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308278", descricao: "Schistosomose, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307778", descricao: "Teste de inibição da migração dos linfócitos (para cada antígeno)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40323919", descricao: "Teste rápido para detecção de HIV em gestante", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307786", descricao: "Teste respiratório para H. Pylori", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307794", descricao: "Toxocara cannis - IgG, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307808", descricao: "Toxocara cannis - IgM, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307816", descricao: "Toxoplasmina, IDeR", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308154", descricao: "Toxoplasmose - IgA, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307824", descricao: "Toxoplasmose IgG, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307832", descricao: "Toxoplasmose IgM, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307840", descricao: "Urease, teste rápido para Helicobacter Pylori", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308162", descricao: "Varicela, IgG, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308170", descricao: "Varicela, IgM, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307859", descricao: "Vírus sincicial respiratório - Elisa - IgG, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308197", descricao: "Vírus sincicial respiratório - pesquisa direta", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307867", descricao: "Waaler-Rose (fator reumatóide), pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40308200", descricao: "Weil Felix (Ricketsiose), reação de aglutinação", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307875", descricao: "Western Blot (anticorpos anti-HIV)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307883", descricao: "Western Blot (anticorpos anti-HTVI ou HTLVII) (cada)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40307891", descricao: "Widal, reação de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40309010", descricao: "Adenosina de aminase (ADA), dosagem em líquidos orgânicos", secao: "Cefalorraqueano (Líquor)" },
  { codigo: "40309266", descricao: "Aminoácidos no líquido cefalorraquidiano", secao: "Cefalorraqueano (Líquor)" },
  { codigo: "40309029", descricao: "Bioquímica LCR (proteínas + pandy + glicose + cloro)", secao: "Cefalorraqueano (Líquor)" },
  { codigo: "40309045", descricao: "Células, pesquisa de células neoplásicas (citologia oncótica), pesquisa em", secao: "Cefalorraqueano (Líquor)" },
  { codigo: "40309053", descricao: "Criptococose, cândida, aspérgilus (látex), pesquisa", secao: "Cefalorraqueano (Líquor)" },
  { codigo: "40309061", descricao: "Eletroforese de proteínas no líquor, com concentração", secao: "Cefalorraqueano (Líquor)" },
  { codigo: "40309096", descricao: "Índice de imunoprodução (eletrof. e IgG em soro e líquor)", secao: "Cefalorraqueano (Líquor)" },
  { codigo: "40309100", descricao: "LCR ambulatorial rotina (aspectos cor + índice de cor + contagem global e", secao: "Cefalorraqueano (Líquor)" },
  { codigo: "40309118", descricao: "LCR hospitalar neurologia (aspectos cor + índices de cor +", secao: "Cefalorraqueano (Líquor)" },
  { codigo: "40309126", descricao: "LCR pronto socorro (aspectos cor + índice de cor + contagem global e", secao: "Cefalorraqueano (Líquor)" },
  { codigo: "40309177", descricao: "Nonne-Apple, reação", secao: "Cefalorraqueano (Líquor)" },
  { codigo: "40309134", descricao: "Pesquisa de bandas oligoclonais por isofocalização", secao: "Cefalorraqueano (Líquor)" },
  { codigo: "40309142", descricao: "Proteína mielina básica, anticorpo anti, pesquisa", secao: "Cefalorraqueano (Líquor)" },
  { codigo: "40309150", descricao: "Punção cisternal subocciptal com manometria para coleta de líquido", secao: "Cefalorraqueano (Líquor)" },
  { codigo: "40309169", descricao: "Punção lombar com manometria para coleta de líquido cefalorraqueano", secao: "Cefalorraqueano (Líquor)" },
  { codigo: "40309185", descricao: "Takata-Ara, reação", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40309304", descricao: "Anticorpo antiespermatozóide, pesquisa", secao: "Seminal" },
  { codigo: "40309320", descricao: "Espermograma e teste de penetração “in vitro”, velocidade", secao: "Seminal" },
  { codigo: "40309401", descricao: "Clements, teste", secao: "Amniótica" },
  { codigo: "40309410", descricao: "Espectrofotometria de líquido amniótico", secao: "Amniótica" },
  { codigo: "40309436", descricao: "Maturidade pulmonar fetal", secao: "Amniótica" },
  { codigo: "40309444", descricao: "Rotina do líquido amniótico-amniograma (citológico", secao: "Amniótica" },
  { codigo: "40309509", descricao: "Cristais com luz polarizada, pesquisa", secao: "Sinovial E Outros" },
  { codigo: "40309517", descricao: "Ragócitos, pesquisa", secao: "Sinovial E Outros" },
  { codigo: "40309525", descricao: "Rotina líquido sinovial - caracteres físicos, citologia, proteínas, ácido úrico,", secao: "Sinovial E Outros" },
  { codigo: "40310019", descricao: "A fresco, exame", secao: "Microbiologia (4.03.10.00-0)" },
  { codigo: "40310418", descricao: "Antibiograma (teste de sensibilidade e antibióticos e quimioterápicos),", secao: "Microbiologia (4.03.10.00-0)" },
  { codigo: "40310426", descricao: "Antibiograma automatizado", secao: "Microbiologia (4.03.10.00-0)" },
  { codigo: "40310035", descricao: "Antibiograma p/ bacilos álcool-resistentes - drogas de 2 linhas", secao: "Microbiologia (4.03.10.00-0)" },
  { codigo: "40310604", descricao: "Antifungirama", secao: "Microbiologia (4.03.10.00-0)" },
  { codigo: "40310043", descricao: "Antígenos fúngicos, pesquisa", secao: "Microbiologia (4.03.10.00-0)" },
  { codigo: "40310060", descricao: "Bacterioscopia (Gram, Ziehl, Albert etc), por lâmina", secao: "Microbiologia (4.03.10.00-0)" },
  { codigo: "40310078", descricao: "Chlamydia, cultura", secao: "Microbiologia (4.03.10.00-0)" },
  { codigo: "40310361", descricao: "Citomegalovírus - shell vial, pesquisa", secao: "Microbiologia (4.03.10.00-0)" },
  { codigo: "40310094", descricao: "Corpúsculos de Donovani, pesquisa direta de", secao: "Microbiologia (4.03.10.00-0)" },
  { codigo: "40310108", descricao: "Criptococo (tinta da China), pesquisa de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310116", descricao: "Criptosporidium, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310400", descricao: "Cultura automatizada", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310124", descricao: "Cultura bacteriana (em diversos materiais biológicos)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310132", descricao: "Cultura para bactérias anaeróbicas", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310140", descricao: "Cultura para fungos", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310159", descricao: "Cultura para mycobacterium", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310167", descricao: "Cultura quantitativa de secreções pulmonares, quando necessitar", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310175", descricao: "Cultura, fezes: salmonela, shigellae e esc. Coli enteropatogênicas,", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310183", descricao: "Cultura, fezes: salmonella, shigella e escherichia coli", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310191", descricao: "Cultura, herpesvírus ou outro", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310205", descricao: "Cultura, micoplasma ou ureaplasma", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310213", descricao: "Cultura, urina com contagem de colônias", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310221", descricao: "Estreptococos - A, teste rápido", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310230", descricao: "Fungos, pesquisa de (a fresco lactofenol, tinta da China)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310280", descricao: "Hansen, pesquisa de (por material)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310248", descricao: "Hemocultura (por amostra)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310256", descricao: "Hemocultura automatizada (por amostra)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310264", descricao: "Hemocultura para bactérias anaeróbias (por amostra)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310272", descricao: "Hemophilus (bordetella) pertussis, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310434", descricao: "Leishmania, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310299", descricao: "Leptospira (campo escuro após concentração), pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310302", descricao: "Microorganismos - teste de sensibilidade a drogas MIC,", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310370", descricao: "Microsporídia, pesquisa nas fezes", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310310", descricao: "Paracoccidioides, pesquisa de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310329", descricao: "Pneumocysti carinii, pesquisa por coloração especial", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310337", descricao: "Rotavírus, pesquisa, Elisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310388", descricao: "Sarcoptes scabei, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310345", descricao: "Treponema (campo escuro), pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40310353", descricao: "Vacina autógena", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311260", descricao: "Acidez titulável", secao: "Urinálise (4.03.11.00-7)" },
  { codigo: "40311015", descricao: "Ácido cítrico, dosagem na urina", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311023", descricao: "Ácido homogentísico, pesquisa e/ou dosagem na urina", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311031", descricao: "Alcaptonúria, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311279", descricao: "Bartituratos, pesquisa e/ou dosagem na urina", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311040", descricao: "Cálculos urinários, análise", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311058", descricao: "Catecolaminas fracionadas - dopamina, epinefrina, norepinefrina", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311244", descricao: "Cistina, pesquisa e/ou dosagem na urina", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311066", descricao: "Cistinúria, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311295", descricao: "Contagem sedimentar de Addis", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311082", descricao: "Corpos cetônicos, pesquisa na urina", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311309", descricao: "Eletroforese de proteínas urinárias, com concentração", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311112", descricao: "Erros inatos do metabolismo baterias de testes químicos de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311317", descricao: "Fenilcetonúria, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311120", descricao: "Frutosúria, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311139", descricao: "Galactosúria, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311325", descricao: "Histidina, pesquisa na urina", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311333", descricao: "Inclusão citomegálica, pesquisa de células com, na urina", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311147", descricao: "Lipóides, pesquisa na urina", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311155", descricao: "Melanina, pesquisa na urina", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311163", descricao: "Metanefrinas urinárias, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311171", descricao: "Microalbuminúriam, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311341", descricao: "Mioglobina, pesquisa na urina", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311350", descricao: "Osmolalidade, determinação na urina", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311180", descricao: "Pesquisa ou dosagem de um componente urinário", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311198", descricao: "Porfobilinogênio, pesquisa na urina", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311252", descricao: "Porfobilinogênio, urina", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311201", descricao: "Proteínas de Bence Jones, pesquisa na urina", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311368", descricao: "Prova de concentração (Fishberg ou Volhard), na urina", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311376", descricao: "Prova de diluição, na urina", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311210", descricao: "Rotina de urina (caracteres físicos, elementos anormais e sedimentoscopia)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311384", descricao: "Sobrecarga de água, prova na urina", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40311392", descricao: "Tirosinose, pesquisa (urina)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40312011", descricao: "Cristalização do muco cervical, pequisa", secao: "Diversos (4.03.12.00-3)" },
  { codigo: "40312020", descricao: "Cromatina sexual, pesquisa", secao: "Diversos (4.03.12.00-3)" },
  { codigo: "40312070", descricao: "Gastroacidograma - secreção basal para 60’ e 4 amostras após o", secao: "Diversos (4.03.12.00-3)" },
  { codigo: "40312089", descricao: "Hollander (inclusive tubagem), teste", secao: "Diversos (4.03.12.00-3)" },
  { codigo: "40312046", descricao: "Iontoforese para a coleta de suor, com dosagem de cloro", secao: "Diversos (4.03.12.00-3)" },
  { codigo: "40312097", descricao: "Pancreozima - secretina no suco duodenal, teste", secao: "Diversos (4.03.12.00-3)" },
  { codigo: "40312135", descricao: "pH - tornassol, pesquisa", secao: "Diversos (4.03.12.00-3)" },
  { codigo: "40312143", descricao: "Prova atividade de febre reumática (aslo, eletroforese de", secao: "Diversos (4.03.12.00-3)" },
  { codigo: "40312151", descricao: "Provas de função hepática (bilirrubinas, eletroforese de", secao: "Diversos (4.03.12.00-3)" },
  { codigo: "40312100", descricao: "Rotina da biles A, B, C e do suco duodenal (caracteres físicos e", secao: "Diversos (4.03.12.00-3)" },
  { codigo: "40312178", descricao: "Teste do pezinho ampliado (TSH neonatal + 17 OH progesterona +", secao: "Diversos (4.03.12.00-3)" },
  { codigo: "40312160", descricao: "Teste do pezinho básico (TSH neonatal + fenilalanina + eletroforese de", secao: "Diversos (4.03.12.00-3)" },
  { codigo: "40312119", descricao: "Tubagem duodenal", secao: "Diversos (4.03.12.00-3)" },
  { codigo: "40313298", descricao: "Ácido acético", secao: "Diversos (4.03.12.00-3)" },
  { codigo: "40313018", descricao: "Ácido delta aminolevulínico (para chumbo inorgânico), pesquisa e/ou dosagem . 0,04 de 1A", secao: "Diversos (4.03.12.00-3)" },
  { codigo: "40313026", descricao: "Ácido delta aminolevulínico desidratase (para chumbo inorgânico)", secao: "Diversos (4.03.12.00-3)" },
  { codigo: "40313034", descricao: "Ácido fenilglioxílico (para estireno), pesquisa e/ou dosagem", secao: "Diversos (4.03.12.00-3)" },
  { codigo: "40313042", descricao: "Ácido hipúrico (para tolueno), pesquisa e/ou dosagem", secao: "Diversos (4.03.12.00-3)" },
  { codigo: "40313050", descricao: "Ácido mandélico (para estireno), pesquisa e/ou dosagem", secao: "Diversos (4.03.12.00-3)" },
  { codigo: "40313301", descricao: "Ácido metil malônico, pesquisa e/ou dosagem", secao: "Diversos (4.03.12.00-3)" },
  { codigo: "40313069", descricao: "Ácido metilhipúrico (para xilenos), pesquisa e/ou dosagem", secao: "Diversos (4.03.12.00-3)" },
  { codigo: "40313077", descricao: "Ácido salicílico, pesquisa e/ou dosagem", secao: "Diversos (4.03.12.00-3)" },
  { codigo: "40313085", descricao: "Azida sódica, teste da (para deissulfeto de carbono)", secao: "Diversos (4.03.12.00-3)" },
  { codigo: "40313093", descricao: "Carboxihemoglobina (para monóxido de carbono diclorometano),", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40313107", descricao: "Chumbo, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40313115", descricao: "Colinesterase (para carbamatos organofosforados), dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40313310", descricao: "Cromo, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40313131", descricao: "Dialdeído malônico, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40313140", descricao: "Etanol, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40313158", descricao: "Fenol (para benzeno, fenol), pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40313174", descricao: "Formoldeído, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40313182", descricao: "Meta-hemoglobina (para anilina nitrobenzeno), pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40313190", descricao: "Metais Al, As, Cd, Cr, Mn, Hg, Ni, Zn, Co, outro (s) absorção", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40313204", descricao: "Metanol, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40313344", descricao: "Metil Etil Cetona, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40313212", descricao: "P-aminofenol (para anilina), pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40313220", descricao: "P-nitrofenol (para nitrobenzeno), pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40313336", descricao: "Salicilatos, pesquisa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40313255", descricao: "Selênio, dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40313263", descricao: "Sulfatos orgânicos ou inorgânicos, pesquisa (cada)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40313271", descricao: "Tiocianato (para cianetos nitrilas alifáticas), pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40313280", descricao: "Triclorocompostos totais (para tetracloroetileno, tricloroetano,", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40313328", descricao: "Zinco, pesquisa e/ou dosagem", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40314014", descricao: "Apolipoproteína E, genotipagem", secao: "Biologia Molecular (4.03.14.00-6)" },
  { codigo: "40314243", descricao: "Chlamydia por biologia molecular, pesquisa", secao: "Biologia Molecular (4.03.14.00-6)" },
  { codigo: "40314251", descricao: "Citogenética de medula óssea", secao: "Biologia Molecular (4.03.14.00-6)" },
  { codigo: "40314022", descricao: "Citomegalovírus - qualitativo, por PCR, pesquisa", secao: "Biologia Molecular (4.03.14.00-6)" },
  { codigo: "40314030", descricao: "Citomegalovírus - quantitativo, por PCR", secao: "Biologia Molecular (4.03.14.00-6)" },
  { codigo: "40314359", descricao: "Epstein BARR vírus por PCR, pesquisa", secao: "Biologia Molecular (4.03.14.00-6)" },
  { codigo: "40314057", descricao: "Fator V de layden por PCR, pesquisa", secao: "Biologia Molecular (4.03.14.00-6)" },
  { codigo: "40314065", descricao: "Fibrose cística, pesquisa de uma mutação", secao: "Biologia Molecular (4.03.14.00-6)" },
  { codigo: "40314073", descricao: "Hepatite B (qualitativo) PCR, pesquisa", secao: "Biologia Molecular (4.03.14.00-6)" },
  { codigo: "40314081", descricao: "Hepatite B (quantitativo) PCR, pesquisa", secao: "Biologia Molecular (4.03.14.00-6)" },
  { codigo: "40314111", descricao: "Hepatite C - genotipagem, pesquisa", secao: "Biologia Molecular (4.03.14.00-6)" },
  { codigo: "40314090", descricao: "Hepatite C (qualitativo) por PCR, pesquisa", secao: "Biologia Molecular (4.03.14.00-6)" },
  { codigo: "40314103", descricao: "Hepatite C (quantitativo) por PCR", secao: "Biologia Molecular (4.03.14.00-6)" },
  { codigo: "40314120", descricao: "HIV - carga viral PCR, pesquisa", secao: "Biologia Molecular (4.03.14.00-6)" },
  { codigo: "40314138", descricao: "HIV - qualitativo por PCR, pesquisa", secao: "Biologia Molecular (4.03.14.00-6)" },
  { codigo: "40314146", descricao: "HIV, genotipagem, pesquisa", secao: "Biologia Molecular (4.03.14.00-6)" },
  { codigo: "40314154", descricao: "HPV (vírus do papiloma humano) + subtipagem quando", secao: "Biologia Molecular (4.03.14.00-6)" },
  { codigo: "40314162", descricao: "HTLV I / II por PCR (cada), pesquisa", secao: "Biologia Molecular (4.03.14.00-6)" },
  { codigo: "40314170", descricao: "Mycobactéria PCR, pesquisa", secao: "Biologia Molecular (4.03.14.00-6)" },
  { codigo: "40314189", descricao: "Parvovírus por PCR, pesquisa", secao: "Biologia Molecular (4.03.14.00-6)" },
  { codigo: "40314278", descricao: "Pesquisa de outros agentes por PCR", secao: "Biologia Molecular (4.03.14.00-6)" },
  { codigo: "40314197", descricao: "Proteína S total + livre, dosagem", secao: "Biologia Molecular (4.03.14.00-6)" },
  { codigo: "40314294", descricao: "Resistência a agentes antivirais por biologia molecular (cada droga), pesquisa", secao: "Biologia Molecular (4.03.14.00-6)" },
  { codigo: "40314200", descricao: "Rubéola por PCR, pesquisa", secao: "Biologia Molecular (4.03.14.00-6)" },
  { codigo: "40314227", descricao: "Toxoplasmose por PCR, pesquisa", secao: "Biologia Molecular (4.03.14.00-6)" },
  { codigo: "40314235", descricao: "X frágil por PCR, pesquisa", secao: "Biologia Molecular (4.03.14.00-6)" },
  { codigo: "40401014", descricao: "Transfusão (ato médico ambulatorial ou hospitalar)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40401022", descricao: "Transfusão (ato médico de acompanhamento)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40402118", descricao: "Deleucotização de unidade de concentrado de hemácias", secao: "Processamento (4.04.02.00-2)" },
  { codigo: "40402126", descricao: "Deleucotização de unidade de concentrado de plaquetas -", secao: "Processamento (4.04.02.00-2)" },
  { codigo: "40402142", descricao: "Deleucotização de unidade de concentrado de plaquetas -", secao: "Processamento (4.04.02.00-2)" },
  { codigo: "40402134", descricao: "Irradiação de componentes hemoterápicos", secao: "Processamento (4.04.02.00-2)" },
  { codigo: "40402010", descricao: "Material descartável (kit) e soluções para utilização de", secao: "Processamento (4.04.02.00-2)" },
  { codigo: "40402029", descricao: "Material descartável (kit) e soluções para utilização de", secao: "Processamento (4.04.02.00-2)" },
  { codigo: "40402037", descricao: "Sangria terapêutica", secao: "Processamento (4.04.02.00-2)" },
  { codigo: "40402150", descricao: "Unidade de concentrado de granulócitos", secao: "Processamento (4.04.02.00-2)" },
  { codigo: "40402045", descricao: "Unidade de concentrado de hemácias", secao: "Processamento (4.04.02.00-2)" },
  { codigo: "40402053", descricao: "Unidade de concentrado de hemácias lavadas", secao: "Processamento (4.04.02.00-2)" },
  { codigo: "40402169", descricao: "Unidade de concentrado de plaquetas (dupla centrifugação)", secao: "Processamento (4.04.02.00-2)" },
  { codigo: "40402061", descricao: "Unidade de concentrado de plaquetas por aférese", secao: "Processamento (4.04.02.00-2)" },
  { codigo: "40402070", descricao: "Unidade de concentrado de plaquetas randômicas", secao: "Processamento (4.04.02.00-2)" },
  { codigo: "40402088", descricao: "Unidade de crioprecipitado de fator anti-hemofílico", secao: "Processamento (4.04.02.00-2)" },
  { codigo: "40402096", descricao: "Unidade de plasma", secao: "Processamento (4.04.02.00-2)" },
  { codigo: "40402100", descricao: "Unidade de sangue total", secao: "Processamento (4.04.02.00-2)" },
  { codigo: "40403017", descricao: "Acompanhamento hospitalar/dia do transplante de medula", secao: "Procedimentos (4.04.03.00-9)" },
  { codigo: "40404021", descricao: "Aférese para paciente ABO incompatível", secao: "Procedimentos (4.04.03.00-9)" },
  { codigo: "40403025", descricao: "Anticorpos eritrocitários naturais e imunes - titulagem", secao: "Procedimentos (4.04.03.00-9)" },
  { codigo: "40404030", descricao: "Antigenemia para diagnóstico de CMV pós-transplante", secao: "Procedimentos (4.04.03.00-9)" },
  { codigo: "40403033", descricao: "Aplicação de medula óssea ou células tronco", secao: "Procedimentos (4.04.03.00-9)" },
  { codigo: "40404048", descricao: "Avaliação quimerismo - VNTR - doador - pré-transplante", secao: "Procedimentos (4.04.03.00-9)" },
  { codigo: "40404056", descricao: "Avaliação quimerismo - VNTR - paciente - pré-transplante", secao: "Procedimentos (4.04.03.00-9)" },
  { codigo: "40404064", descricao: "Avaliação quimerismo por STR - paciente - pós-transplante", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403068", descricao: "Coleta de biópsia de medula óssea por agulha", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403041", descricao: "Coleta de células tronco de sangue de cordão umbilical para", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403050", descricao: "Coleta de células tronco por processadora automática para", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40404072", descricao: "Coleta de linfócitos de sangue periférico por aférese para", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403076", descricao: "Coleta de medula óssea para transplante", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40404080", descricao: "Controle microbiológico da medula óssea no Transplante de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40404099", descricao: "Controle microbiológico das células tronco periféricas no", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40404102", descricao: "Depleção de plasma em Transplante de Células-Tronco", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403874", descricao: "Detecção de consumo de oxigênio (O2) por unidade de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403882", descricao: "Detecção de consumo de oxigênio (O2) por unidade de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403084", descricao: "Determinação de células CD34, CD45 positivas", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403092", descricao: "Determinação de conteúdo de DNA - Citômetro de Fluxo", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403920", descricao: "Determinação do fator RH (D), incluindo prova para D-fraco", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403939", descricao: "Doação autóloga com recuperação intra-operatória", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403947", descricao: "Doação autóloga peri-operatória por hemodiluição normovolêmica", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403955", descricao: "Doação autóloga pré-operatória", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403106", descricao: "Eletroforese de hemoglobina por componente hemoterápico", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403114", descricao: "Eletroforese de hemoglobina por unidade de sangue total", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403912", descricao: "Estimulação e mobilização de células CD34 positivas", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403122", descricao: "Exsanguíneo transfusão", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403130", descricao: "Fenotipagem de outros sistemas eritrocitários - por fenótipo", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403149", descricao: "Fenotipagem de outros sistemas eritrocitários - por fenótipo -", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403157", descricao: "Fenotipagem do sistema RH-HR (D, C, E, C E C) gel teste", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403165", descricao: "Fenotipagem do sistema RH-HR (D, C, E, C, E)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403173", descricao: "Grupo sanguíneo ABO e RH", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403181", descricao: "Grupo sanguíneo ABO e RH - gel teste", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403246", descricao: "Imunofenotipagem de subpopulações linfocitárias - Citômetro", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403980", descricao: "Investigação da presença de anti-A ou anti-B, em soro", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403890", descricao: "NAT/HBV - por componente hemoterápico", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403904", descricao: "NAT/HBV - por unidade de sangue total", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403262", descricao: "NAT/HCV por componente hemoterápico", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403270", descricao: "NAT/HCV por unidade de sangue total", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403289", descricao: "NAT/HIV por componente hemoterápico", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403297", descricao: "NAT/HIV por unidade de sangue total", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403300", descricao: "Operação de processadora automática de sangue em aférese", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403319", descricao: "Operação de processadora automática de sangue em", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40404110", descricao: "PCR em tempo real para diagnóstico de adenovírus", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40404129", descricao: "PCR em tempo real para diagnóstico de EBV - pós-transplante", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40404137", descricao: "PCR em tempo real para diagnóstico de Herpes vírus 6 -", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40404145", descricao: "PCR em tempo real para diagnóstico de Herpes vírus 8 -", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40404161", descricao: "PCR em tempo real para vírus respiratório sincicial", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403335", descricao: "Pesquisa de anticorpos séricos antieritrocitários,", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403327", descricao: "Pesquisa de anticorpos séricos antieritrocitários,", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403343", descricao: "Pesquisa de anticorpos séricos irregulares", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403351", descricao: "Pesquisa de anticorpos séricos irregulares", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403360", descricao: "Pesquisa de anticorpos séricos irregulares", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403378", descricao: "Pesquisa de anticorpos séricos irregulares", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403386", descricao: "Pesquisa de hemoglobina S por componente", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403394", descricao: "Pesquisa de hemoglobina S por unidade de sangue total - gel teste", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403408", descricao: "Prova de compatibilidade pré-transfusional completa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403416", descricao: "Prova de compatibilidade pré-transfusional completa - gel teste", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403424", descricao: "S. Anti-HTLV-I + HTLV-II (determinação conjunta)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403432", descricao: "S. Anti-HTLV-I + HTLV-II (determinação conjunta) por", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403440", descricao: "S. Chagas EIE por componente hemoterápico", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403459", descricao: "S. Chagas EIE por unidade de sangue total", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403629", descricao: "S. Chagas HA por componente hemoterápico", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403637", descricao: "S. Chagas HA por unidade de sangue total", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403645", descricao: "S. Chagas IFI por componente hemoterápico", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403653", descricao: "S. Chagas IFI por unidade de sangue total", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403661", descricao: "S. Hepatite B (HBsAg) RIE ou EIE por componente hemoterápico", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403670", descricao: "S. Hepatite B (HBsAg) RIE ou EIE por unidade de sangue total", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403467", descricao: "S. Hepatite B anti-HBC por componente hemoterápico", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403475", descricao: "S. Hepatite B anti-HBC por unidade de sangue total", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403483", descricao: "S. Hepatite C anti-HCV por componente hemoterápico", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403491", descricao: "S. Hepatite C anti-HCV por unidade de sangue total", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403505", descricao: "S. HIV EIE por componente hemoterápico", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403513", descricao: "S. HIV EIE por unidade de sangue total", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403521", descricao: "S. Malária IFI por componente hemoterápico", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403530", descricao: "S. Malária IFI por unidade de sangue total", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40404250", descricao: "Sedimentação de hemácias em Transplante de Células-", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403688", descricao: "Teste de Coombs direto", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403696", descricao: "Teste de Coombs direto - gel teste", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403726", descricao: "TMO - congelamento de medula óssea ou células", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403734", descricao: "TMO - cultura de linfócitos doador e receptor", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403742", descricao: "TMO - descongelamento de medula óssea ou células tronco", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403750", descricao: "TMO - determinação de HLA transplantes de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403769", descricao: "TMO - determinação de HLA para transplantes de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403777", descricao: "TMO - determinação de HLA para transplantes de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403785", descricao: "TMO - determinação de unidades formadoras de colônias", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403793", descricao: "TMO - determinação de viabilidade de medula óssea", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403807", descricao: "TMO - manutenção de congelamento de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403815", descricao: "TMO - preparo de medula óssea ou células tronco", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403831", descricao: "TMO - tratamento “in vitro” de medula óssea ou", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403840", descricao: "Transaminase pirúvica - TGP ou ALT por componente", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403858", descricao: "Transaminase pirúvica - TGP ou ALT por unidade de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40403866", descricao: "Transfusão fetal intra-uterina", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40404285", descricao: "Viabilidade celular das células tronco periféricas por", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40404269", descricao: "Viabilidade celular dos linfócitos periféricos por citometria", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40499006", descricao: "INSTRUÇÕES TÉCNICAS:", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40501019", descricao: "Cariótipo com bandas de pele, tumor e demais tecidos", secao: "Citogenética (4.05.01.00-0)" },
  { codigo: "40501027", descricao: "Cariótipo com pesquisa de troca de cromátides irmãs", secao: "Citogenética (4.05.01.00-0)" },
  { codigo: "40501035", descricao: "Cariótipo com técnicas de alta resolução", secao: "Citogenética (4.05.01.00-0)" },
  { codigo: "40501043", descricao: "Cariótipo de medula (técnicas com bandas)", secao: "Citogenética (4.05.01.00-0)" },
  { codigo: "40501051", descricao: "Cariótipo de sangue (técnicas com bandas)", secao: "Citogenética (4.05.01.00-0)" },
  { codigo: "40501221", descricao: "Cariótipo de sangue (técnicas com bandas) - Análise de 50 células para", secao: "Citogenética (4.05.01.00-0)" },
  { codigo: "40501060", descricao: "Cariótipo de sangue obtido por cordocentese pré-natal", secao: "Citogenética (4.05.01.00-0)" },
  { codigo: "40501078", descricao: "Cariótipo de sangue-pesquisa de marcadores tumorais", secao: "Citogenética (4.05.01.00-0)" },
  { codigo: "40501086", descricao: "Cariótipo de sangue-pesquisa de sítio frágil X", secao: "Citogenética (4.05.01.00-0)" },
  { codigo: "40501094", descricao: "Cariótipo em vilosidades coriônicas (cultivo de trofoblastos)", secao: "Citogenética (4.05.01.00-0)" },
  { codigo: "40501108", descricao: "Cariótipo para pesquisa de instabilidade cromossômica", secao: "Citogenética (4.05.01.00-0)" },
  { codigo: "40501116", descricao: "Cromatina X ou Y", secao: "Citogenética (4.05.01.00-0)" },
  { codigo: "40501124", descricao: "Cultura de material de aborto e obtenção de cariótipo", secao: "Citogenética (4.05.01.00-0)" },
  { codigo: "40501132", descricao: "Cultura de tecido para ensaio enzimático e/ou extração de DNA", secao: "Citogenética (4.05.01.00-0)" },
  { codigo: "40501205", descricao: "Estudo de alterações cromossômicas em leucemias por FISH (Fluorescence", secao: "Citogenética (4.05.01.00-0)" },
  { codigo: "40501159", descricao: "Fish em metáfase ou núcleo interfásico, por sonda", secao: "Citogenética (4.05.01.00-0)" },
  { codigo: "40501167", descricao: "Fish pré-natal, por sonda", secao: "Citogenética (4.05.01.00-0)" },
  { codigo: "40501175", descricao: "Líquido amniótico, cariótipo com bandas", secao: "Citogenética (4.05.01.00-0)" },
  { codigo: "40501183", descricao: "Líquido amniótico, vilosidades coriônicas, subcultura para dosagens", secao: "Citogenética (4.05.01.00-0)" },
  { codigo: "40501213", descricao: "Pesquisa de Translocação PML/RAR-a", secao: "Citogenética (4.05.01.00-0)" },
  { codigo: "40501191", descricao: "Subcultura de pele para dosagens bioquímicas e/ou moleculares (adicional)", secao: "Citogenética (4.05.01.00-0)" },
  { codigo: "40502058", descricao: "Determinação do risco fetal, com elaboração de laudo", secao: "Genética Bioquímica (4.05.02.00-7)" },
  { codigo: "40502180", descricao: "Dosagem quantitativa de ácidos graxos de cadeia muito longa para o", secao: "Genética Bioquímica (4.05.02.00-7)" },
  { codigo: "40502236", descricao: "Dosagem quantitativa de ácidos orgânicos para o diagnóstico de erros", secao: "Genética Bioquímica (4.05.02.00-7)" },
  { codigo: "40502074", descricao: "Dosagem quantitativa de aminoácidos para o diagnóstico de erros inatos", secao: "Genética Bioquímica (4.05.02.00-7)" },
  { codigo: "40502082", descricao: "Dosagem quantitativa de metabólitos na urina e/ou sangue para o", secao: "Genética Bioquímica (4.05.02.00-7)" },
  { codigo: "40502201", descricao: "Dosagem quantitativa de metabólitos por espectrometria de massa ou", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40502104", descricao: "Ensaios enzimáticos em células cultivadas para diagnóstico de EIM,", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40502112", descricao: "Ensaios enzimáticos em leucócitos, eritrócitos ou tecidos para diagnóstico", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40502120", descricao: "Ensaios enzimáticos no plasma para diagnóstico de EIM, incluindo", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40502015", descricao: "Marcadores bioquímicos extras, além de BHCG, AFP e PAPP-A, para", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40502228", descricao: "Rastreamento neonatal para o diagnósitco de EIM e outras doenças", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40502210", descricao: "Terapia de reposição enzimática por infusão endovenosa, por procedimento", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40502139", descricao: "Teste duplo - 1 trimestre (PAPP-A+Beta-HCG) ou outros 2 em soro", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40502147", descricao: "Teste duplo - 2 trimestre (AFP+Beta-HCG) ou outros 2 em soro", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40502155", descricao: "Teste triplo (AFP+Beta-HCG+Estriol) ou outros 3 em soro ou líquido", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40502163", descricao: "Testes químicos de triagem em urina para erros inatos do metabolismo (cada)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40503011", descricao: "Análise de DNA com enzimas de restrição por enzima utilizada, por amostra", secao: "Genética Molecular (4.05.03.00-3)" },
  { codigo: "40503020", descricao: "Análise de DNA fetal por enzima de restrição, por enzima utilizada, por amostra", secao: "Genética Molecular (4.05.03.00-3)" },
  { codigo: "40503160", descricao: "Análise de DNA pela técnica de Southern Blot, por sonda utilizada, por amostra", secao: "Genética Molecular (4.05.03.00-3)" },
  { codigo: "40503046", descricao: "Análise de DNA pela técnica multiplex por locus extra, por amostra", secao: "Genética Molecular (4.05.03.00-3)" },
  { codigo: "40503054", descricao: "Análise de DNA pela técnica multiplex por locus, por amostra", secao: "Genética Molecular (4.05.03.00-3)" },
  { codigo: "40503151", descricao: "Análise de DNA por MLPA, por sonda de DNA utilizada, por amostra", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40503224", descricao: "Análise de expressão gênica por locus, por amostra, por CGH array,", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40503208", descricao: "Coloração de gel e Fotodocumentação da análise molecular, por amostra", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40503232", descricao: "Detecção pré-natal ou pós-natal de alterações cromossômicas submicroscópicas", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40503070", descricao: "Diagnóstico genético pré-implantação por DNA, por sonda de FISH ou", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40503089", descricao: "Extração de DNA (osso), por amostra", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40503216", descricao: "Interpretação e elaboração do laudo da análise genética, por amostra", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40503119", descricao: "Processamento de qualquer tipo de amostra biológica para estabilização", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40503178", descricao: "Produção de DOT/SLOT-BLOT, por BLOT, por amostra", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40503194", descricao: "Rastreamento de exon mutado (por gradiente de desnaturação", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40503186", descricao: "Separação do material genético por eletroforese capilar ou em gel (agarose,", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40503135", descricao: "Transcrição reversa de RNA, por amostra", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40503259", descricao: "Validação pré-natal ou pós-natal de alteração cromossômica submicroscópica", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40601102", descricao: "Ato de coleta de PAAF de órgãos ou estruturas profundas com", secao: "Procedimentos (4.06.01.00-5)" },
  { codigo: "40601080", descricao: "Ato de coleta de PAAF de órgãos ou estruturas profundas sem", secao: "Procedimentos (4.06.01.00-5)" },
  { codigo: "40601269", descricao: "Coloração especial por coloração", secao: "Procedimentos (4.06.01.00-5)" },
  { codigo: "40601064", descricao: "Microscopia eletrônica", secao: "Procedimentos (4.06.01.00-5)" },
  { codigo: "40601048", descricao: "Necrópsia de adulto/criança e natimorto com suspeita", secao: "Procedimentos (4.06.01.00-5)" },
  { codigo: "40601056", descricao: "Necrópsia de embrião/feto até 500 gramas", secao: "Procedimentos (4.06.01.00-5)" },
  { codigo: "40601323", descricao: "Procedimento diagnóstico citopatológico em meio líquido", secao: "Procedimentos (4.06.01.00-5)" },
  { codigo: "40601129", descricao: "Procedimento diagnóstico citopatológico oncótico de líquidos", secao: "Procedimentos (4.06.01.00-5)" },
  { codigo: "40601242", descricao: "Procedimento diagnóstico em amputação de membros -", secao: "Procedimentos (4.06.01.00-5)" },
  { codigo: "40601234", descricao: "Procedimento diagnóstico em amputação de membros -", secao: "Procedimentos (4.06.01.00-5)" },
  { codigo: "40601110", descricao: "Procedimento diagnóstico em biópsia simples “imprint”", secao: "Procedimentos (4.06.01.00-5)" },
  { codigo: "40601161", descricao: "Procedimento diagnóstico em citologia hormonal isolada", secao: "Procedimentos (4.06.01.00-5)" },
  { codigo: "40601145", descricao: "Procedimento diagnóstico em citologia hormonal seriado", secao: "Procedimentos (4.06.01.00-5)" },
  { codigo: "40601315", descricao: "Procedimento diagnóstico em citometria de imagens", secao: "Procedimentos (4.06.01.00-5)" },
  { codigo: "40601137", descricao: "Procedimento diagnóstico em citopatologia cérvico-vaginal oncótica", secao: "Procedimentos (4.06.01.00-5)" },
  { codigo: "40601196", descricao: "Procedimento diagnóstico em fragmentos múltiplos de biópsias", secao: "Procedimentos (4.06.01.00-5)" },
  { codigo: "40601226", descricao: "Procedimento diagnóstico em grupos de linfonodos, estruturas", secao: "Procedimentos (4.06.01.00-5)" },
  { codigo: "40601250", descricao: "Procedimento diagnóstico em lâminas de PAAF até 5", secao: "Procedimentos (4.06.01.00-5)" },
  { codigo: "40601285", descricao: "Procedimento diagnóstico em painel de hibridização “in situ”", secao: "Procedimentos (4.06.01.00-5)" },
  { codigo: "40601170", descricao: "Procedimento diagnóstico em painel de imunoistoquímica", secao: "Procedimentos (4.06.01.00-5)" },
  { codigo: "40601200", descricao: "Procedimento diagnóstico em peça anatômica ou cirúrgica simples", secao: "Procedimentos (4.06.01.00-5)" },
  { codigo: "40601218", descricao: "Procedimento diagnóstico em peça cirúrgica ou", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40601188", descricao: "Procedimento diagnóstico em reação imunoistoquímica isolada", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40601153", descricao: "Procedimento diagnóstico em revisão de lâminas", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40601021", descricao: "Procedimento diagnóstico peroperatório - peça adicional ou", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40601030", descricao: "Procedimento diagnóstico peroperatório com deslocamento", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40601013", descricao: "Procedimento diagnóstico peroperatório sem deslocamento", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40601293", descricao: "Procedimento diagnóstico por captura híbrida", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40701093", descricao: "Fluxo sanguíneo das extremidades", secao: "Cardiovascular - In Vivo (4.07.01.00-0)" },
  { codigo: "40702111", descricao: "Fluxo sanguíneo hepático (qualitativo e quantitativo)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40703061", descricao: "Teste de estímulo com TSH recombinante", secao: "Endócrino - In Vivo (4.07.03.00-2)" },
  { codigo: "40703070", descricao: "Teste de supressão da tireóide com T3", secao: "Endócrino - In Vivo (4.07.03.00-2)" },
  { codigo: "40703088", descricao: "Teste do perclorato", secao: "Endócrino - In Vivo (4.07.03.00-2)" },
  { codigo: "40705021", descricao: "Demonstração do sequestro de hemácias pelo baço", secao: "Hematológico - In Vivo (4.07.05.00-5)" },
  { codigo: "40705030", descricao: "Determinação da sobrevida de hemácias", secao: "Hematológico - In Vivo (4.07.05.00-5)" },
  { codigo: "40705048", descricao: "Determinação do volume eritrocitário", secao: "Hematológico - In Vivo (4.07.05.00-5)" },
  { codigo: "40705056", descricao: "Determinação do volume plasmático", secao: "Hematológico - In Vivo (4.07.05.00-5)" },
  { codigo: "40705064", descricao: "Teste de absorção de vitamina B12 com", secao: "Hematológico - In Vivo (4.07.05.00-5)" },
  { codigo: "40706028", descricao: "Fluxo sanguíneo ósseo", secao: "Músculo - Esquelético - In Vivo (4.07.06.00-1)" },
  { codigo: "40707067", descricao: "Fluxo sanguíneo cerebral", secao: "Nervoso - In Vivo (4.07.07.00-8)" },
  { codigo: "40708071", descricao: "Demarcação radioisotópica de lesões tumorais", secao: "Oncologia / Infectologia - In Vivo (4.07.08.00-4)" },
  { codigo: "40708080", descricao: "Detecção intraoperatória radioguiada de lesões tumorais", secao: "Oncologia / Infectologia - In Vivo (4.07.08.00-4)" },
  { codigo: "40708098", descricao: "Detecção intraoperatória radioguiada de linfonodo sentinela", secao: "Oncologia / Infectologia - In Vivo (4.07.08.00-4)" },
  { codigo: "40708128", descricao: "PET dedicado oncológico", secao: "Oncologia / Infectologia - In Vivo (4.07.08.00-4)" },
  { codigo: "40710017", descricao: "Sessão médica para planejamento técnico de", secao: "Terapia - In Vivo (4.07.10.00-9)" },
  { codigo: "40710025", descricao: "Tratamento com metaiodobenzilguanidina (MIBG)", secao: "Terapia - In Vivo (4.07.10.00-9)" },
  { codigo: "40710033", descricao: "Tratamento da policitemia vera", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40710041", descricao: "Tratamento de câncer da tireóide", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40710050", descricao: "Tratamento de hipertireoidismo-bócio nodular", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40710068", descricao: "Tratamento de hipertireoidismo-bócio nodular", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40710076", descricao: "Tratamento de metástases ósseas (estrôncio-90)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40710084", descricao: "Tratamento de metástases ósseas (samário-153)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40710092", descricao: "Tratamento de tumores neuroendócrinos", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40799000", descricao: "INSTRUÇÕES ESPECÍFICAS PARA MEDICINA NUCLEAR “IN VIVO”", secao: "Outros - In Vivo (4.07.11.00-5)" },
  { codigo: "40801128", descricao: "Adenóides ou cavum", secao: "Crânio E Face (4.08.01.00-4)" },
  { codigo: "40801160", descricao: "Arcada dentária (por arcada)", secao: "Crânio E Face (4.08.01.00-4)" },
  { codigo: "40801110", descricao: "Articulação temporomandibular - bilateral", secao: "Crânio E Face (4.08.01.00-4)" },
  { codigo: "40801012", descricao: "Crânio - 2 incidências", secao: "Crânio E Face (4.08.01.00-4)" },
  { codigo: "40801020", descricao: "Crânio - 3 incidências", secao: "Crânio E Face (4.08.01.00-4)" },
  { codigo: "40801039", descricao: "Crânio - 4 incidências", secao: "Crânio E Face (4.08.01.00-4)" },
  { codigo: "40801209", descricao: "Incidência adicional de crânio ou face", secao: "Crânio E Face (4.08.01.00-4)" },
  { codigo: "40801080", descricao: "Maxilar inferior", secao: "Crânio E Face (4.08.01.00-4)" },
  { codigo: "40801055", descricao: "Órbitas - bilateral", secao: "Crânio E Face (4.08.01.00-4)" },
  { codigo: "40801047", descricao: "Orelha, mastóides ou rochedos - bilateral", secao: "Crânio E Face (4.08.01.00-4)" },
  { codigo: "40801098", descricao: "Ossos da face", secao: "Crânio E Face (4.08.01.00-4)" },
  { codigo: "40801063", descricao: "Seios da face", secao: "Crânio E Face (4.08.01.00-4)" },
  { codigo: "40801071", descricao: "Sela túrcica", secao: "Crânio E Face (4.08.01.00-4)" },
  { codigo: "40802019", descricao: "Coluna cervical - 3 incidências", secao: "Coluna Vertebral (4.08.02.00-0)" },
  { codigo: "40802027", descricao: "Coluna cervical - 5 incidências", secao: "Coluna Vertebral (4.08.02.00-0)" },
  { codigo: "40802035", descricao: "Coluna dorsal - 2 incidências", secao: "Coluna Vertebral (4.08.02.00-0)" },
  { codigo: "40802043", descricao: "Coluna dorsal - 4 incidências", secao: "Coluna Vertebral (4.08.02.00-0)" },
  { codigo: "40802086", descricao: "Coluna dorso-lombar para escoliose", secao: "Coluna Vertebral (4.08.02.00-0)" },
  { codigo: "40802051", descricao: "Coluna lombo-sacra - 3 incidências", secao: "Coluna Vertebral (4.08.02.00-0)" },
  { codigo: "40802060", descricao: "Coluna lombo-sacra - 5 incidências", secao: "Coluna Vertebral (4.08.02.00-0)" },
  { codigo: "40802116", descricao: "Incidência adicional de coluna", secao: "Coluna Vertebral (4.08.02.00-0)" },
  { codigo: "40802078", descricao: "Sacro-coccix", secao: "Coluna Vertebral (4.08.02.00-0)" },
  { codigo: "40803104", descricao: "Antebraço", secao: "Esqueleto Torácico E Membros Superiores (4.08.03.00-7)" },
  { codigo: "40803066", descricao: "Articulação acromioclavicular", secao: "Esqueleto Torácico E Membros Superiores (4.08.03.00-7)" },
  { codigo: "40803074", descricao: "Articulação escapuloumeral (ombro)", secao: "Esqueleto Torácico E Membros Superiores (4.08.03.00-7)" },
  { codigo: "40803023", descricao: "Articulação esternoclavicular", secao: "Esqueleto Torácico E Membros Superiores (4.08.03.00-7)" },
  { codigo: "40803082", descricao: "Braço", secao: "Esqueleto Torácico E Membros Superiores (4.08.03.00-7)" },
  { codigo: "40803040", descricao: "Clavícula", secao: "Esqueleto Torácico E Membros Superiores (4.08.03.00-7)" },
  { codigo: "40803031", descricao: "Costelas - por hemitórax", secao: "Esqueleto Torácico E Membros Superiores (4.08.03.00-7)" },
  { codigo: "40803090", descricao: "Cotovelo", secao: "Esqueleto Torácico E Membros Superiores (4.08.03.00-7)" },
  { codigo: "40803015", descricao: "Esterno", secao: "Esqueleto Torácico E Membros Superiores (4.08.03.00-7)" },
  { codigo: "40803147", descricao: "Incidência adicional de membro superior", secao: "Esqueleto Torácico E Membros Superiores (4.08.03.00-7)" },
  { codigo: "40803120", descricao: "Mão ou quirodáctilo", secao: "Esqueleto Torácico E Membros Superiores (4.08.03.00-7)" },
  { codigo: "40803139", descricao: "Mãos e punhos para idade óssea", secao: "Esqueleto Torácico E Membros Superiores (4.08.03.00-7)" },
  { codigo: "40803058", descricao: "Omoplata ou escápula", secao: "Esqueleto Torácico E Membros Superiores (4.08.03.00-7)" },
  { codigo: "40803112", descricao: "Punho", secao: "Esqueleto Torácico E Membros Superiores (4.08.03.00-7)" },
  { codigo: "40804038", descricao: "Articulação coxofemoral (quadril)", secao: "Bacia E Membros Inferiores (4.08.04.00-3)" },
  { codigo: "40804089", descricao: "Articulação tibiotársica (tornozelo)", secao: "Bacia E Membros Inferiores (4.08.04.00-3)" },
  { codigo: "40804020", descricao: "Articulações sacroilíacas", secao: "Bacia E Membros Inferiores (4.08.04.00-3)" },
  { codigo: "40804011", descricao: "Bacia", secao: "Bacia E Membros Inferiores (4.08.04.00-3)" },
  { codigo: "40804100", descricao: "Calcâneo", secao: "Bacia E Membros Inferiores (4.08.04.00-3)" },
  { codigo: "40804119", descricao: "Escanometria", secao: "Bacia E Membros Inferiores (4.08.04.00-3)" },
  { codigo: "40804135", descricao: "Incidência adicional de membro inferior", secao: "Bacia E Membros Inferiores (4.08.04.00-3)" },
  { codigo: "40804054", descricao: "Joelho", secao: "Bacia E Membros Inferiores (4.08.04.00-3)" },
  { codigo: "40804127", descricao: "Panorâmica dos membros inferiores", secao: "Bacia E Membros Inferiores (4.08.04.00-3)" },
  { codigo: "40804062", descricao: "Patela", secao: "Bacia E Membros Inferiores (4.08.04.00-3)" },
  { codigo: "40804097", descricao: "Pé ou pododáctilo", secao: "Bacia E Membros Inferiores (4.08.04.00-3)" },
  { codigo: "40804070", descricao: "Perna", secao: "Bacia E Membros Inferiores (4.08.04.00-3)" },
  { codigo: "40805050", descricao: "Coração e vasos da base", secao: "Tórax (4.08.05.00-0)" },
  { codigo: "40805077", descricao: "Laringe ou hipofaringe ou pescoço (partes moles)", secao: "Tórax (4.08.05.00-0)" },
  { codigo: "40805018", descricao: "Tórax - 1 incidência", secao: "Tórax (4.08.05.00-0)" },
  { codigo: "40805026", descricao: "Tórax - 2 incidências", secao: "Tórax (4.08.05.00-0)" },
  { codigo: "40805034", descricao: "Tórax - 3 incidências", secao: "Tórax (4.08.05.00-0)" },
  { codigo: "40805042", descricao: "Tórax - 4 incidências", secao: "Tórax (4.08.05.00-0)" },
  { codigo: "40806081", descricao: "Clister ou enema opaco (duplo contraste)", secao: "Sistema Digestivo (4.08.06.00-6)" },
  { codigo: "40806090", descricao: "Defecograma", secao: "Sistema Digestivo (4.08.06.00-6)" },
  { codigo: "40806014", descricao: "Deglutograma", secao: "Sistema Digestivo (4.08.06.00-6)" },
  { codigo: "40806030", descricao: "Esôfago", secao: "Sistema Digestivo (4.08.06.00-6)" },
  { codigo: "40806057", descricao: "Esôfago - hiato - estômago e duodeno", secao: "Sistema Digestivo (4.08.06.00-6)" },
  { codigo: "40806049", descricao: "Estômago e duodeno", secao: "Sistema Digestivo (4.08.06.00-6)" },
  { codigo: "40806073", descricao: "Estudo do delgado com duplo contraste", secao: "Sistema Digestivo (4.08.06.00-6)" },
  { codigo: "40806065", descricao: "Trânsito e morfologia do delgado", secao: "Sistema Digestivo (4.08.06.00-6)" },
  { codigo: "40806022", descricao: "Videodeglutograma", secao: "Sistema Digestivo (4.08.06.00-6)" },
  { codigo: "40808025", descricao: "Abdome agudo", secao: "Outros Exames (4.08.08.00-9)" },
  { codigo: "40808017", descricao: "Abdome simples", secao: "Outros Exames (4.08.08.00-9)" },
  { codigo: "40808157", descricao: "Avaliação de fraturas vertebrais por DXA", secao: "Outros Exames (4.08.08.00-9)" },
  { codigo: "40808254", descricao: "Biópsia percutânea de fragmento mamário", secao: "Outros Exames (4.08.08.00-9)" },
  { codigo: "40808270", descricao: "Biópsia percutânea de fragmento mamário", secao: "Outros Exames (4.08.08.00-9)" },
  { codigo: "40808262", descricao: "Biópsia percutânea de fragmento mamário", secao: "Outros Exames (4.08.08.00-9)" },
  { codigo: "40808149", descricao: "Densitometria óssea - corpo inteiro (avaliação", secao: "Outros Exames (4.08.08.00-9)" },
  { codigo: "40808130", descricao: "Densitometria óssea - rotina: coluna e fêmur", secao: "Outros Exames (4.08.08.00-9)" },
  { codigo: "40808122", descricao: "Densitometria óssea (um segmento)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40808114", descricao: "Esqueleto (incidências básicas de: crânio,", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40808289", descricao: "Mamotomia por estereotaxia (não inclui o exame de imagem)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40808300", descricao: "Mamotomia por RM (não inclui o exame de imagem)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40808297", descricao: "Mamotomia por US (não inclui o exame de imagem)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40808190", descricao: "Marcação pré-cirúrgica por nódulo - máximo de 3 nódulos", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40808211", descricao: "Marcação pré-cirúrgica por nódulo - máximo de 3 nódulos", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40808200", descricao: "Marcação pré-cirúrgica por nódulo - máximo de 3 nódulos", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40808220", descricao: "Punção ou biópsia mamária percutânea por agulha", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40808246", descricao: "Punção ou biópsia mamária percutânea por agulha", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40808238", descricao: "Punção ou biópsia mamária percutânea por agulha", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40809102", descricao: "Drenagem percutânea orientada por RX (acrescentar", secao: "Procedimentos Especiais (4.08.09.00-5)" },
  { codigo: "40809188", descricao: "Punção biópsia/aspirativa de órgão ou estrutura", secao: "Procedimentos Especiais (4.08.09.00-5)" },
  { codigo: "40809153", descricao: "Punção biópsia/aspirativa de órgão ou estrutura", secao: "Procedimentos Especiais (4.08.09.00-5)" },
  { codigo: "40809170", descricao: "Punção biópsia/aspirativa de órgão ou estrutura", secao: "Procedimentos Especiais (4.08.09.00-5)" },
  { codigo: "40809161", descricao: "Punção biópsia/aspirativa de órgão ou estrutura", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40810046", descricao: "Avaliação hemodinâmica por cateterismo (aferimento", secao: "Neurorradiologia (4.08.10.00-3)" },
  { codigo: "40810038", descricao: "Colheita seletiva de sangue para dosagem hormonal", secao: "Neurorradiologia (4.08.10.00-3)" },
  { codigo: "40810020", descricao: "Teste de oclusão de artéria carótida ou vertebral", secao: "Neurorradiologia (4.08.10.00-3)" },
  { codigo: "40811018", descricao: "Radioscopia diagnóstica", secao: "Radioscopia (4.08.11.00-0)" },
  { codigo: "40811026", descricao: "Radioscopia para acompanhamento de procedimento", secao: "Radioscopia (4.08.11.00-0)" },
  { codigo: "40813045", descricao: "Ablação percutânea de tumor (qualquer", secao: "Métodos Intervencionistas / Terapêuticos Por Imagem (4.08.13.00-2)" },
  { codigo: "40813029", descricao: "Ablação percutânea de tumor hepático", secao: "Métodos Intervencionistas / Terapêuticos Por Imagem (4.08.13.00-2)" },
  { codigo: "40813037", descricao: "Ablação percutânea de tumor ósseo", secao: "Métodos Intervencionistas / Terapêuticos Por Imagem (4.08.13.00-2)" },
  { codigo: "40813010", descricao: "Ablação percutânea de tumor torácico", secao: "Métodos Intervencionistas / Terapêuticos Por Imagem (4.08.13.00-2)" },
  { codigo: "40813053", descricao: "Alcoolização percutânea de angioma", secao: "Métodos Intervencionistas / Terapêuticos Por Imagem (4.08.13.00-2)" },
  { codigo: "40813118", descricao: "Angioplastia arterial ou venosa de anastomose", secao: "Métodos Intervencionistas / Terapêuticos Por Imagem (4.08.13.00-2)" },
  { codigo: "40813134", descricao: "Angioplastia arterial ou venosa de anastomose", secao: "Métodos Intervencionistas / Terapêuticos Por Imagem (4.08.13.00-2)" },
  { codigo: "40813088", descricao: "Angioplastia de aorta para tratamento de", secao: "Métodos Intervencionistas / Terapêuticos Por Imagem (4.08.13.00-2)" },
  { codigo: "40813100", descricao: "Angioplastia de artéria visceral - por vaso", secao: "Métodos Intervencionistas / Terapêuticos Por Imagem (4.08.13.00-2)" },
  { codigo: "40813061", descricao: "Angioplastia de ramo intracraniano", secao: "Métodos Intervencionistas / Terapêuticos Por Imagem (4.08.13.00-2)" },
  { codigo: "40813142", descricao: "Angioplastia de ramos hipogástricos", secao: "Métodos Intervencionistas / Terapêuticos Por Imagem (4.08.13.00-2)" },
  { codigo: "40813070", descricao: "Angioplastia de tronco supra-aórtico", secao: "Métodos Intervencionistas / Terapêuticos Por Imagem (4.08.13.00-2)" },
  { codigo: "40813150", descricao: "Angioplastia de tronco venoso", secao: "Métodos Intervencionistas / Terapêuticos Por Imagem (4.08.13.00-2)" },
  { codigo: "40813126", descricao: "Angioplastia renal para tratamento de hipertensão", secao: "Métodos Intervencionistas / Terapêuticos Por Imagem (4.08.13.00-2)" },
  { codigo: "40813177", descricao: "Angioplastia transluminal percutânea", secao: "Métodos Intervencionistas / Terapêuticos Por Imagem (4.08.13.00-2)" },
  { codigo: "40813185", descricao: "Angioplastia transluminal percutânea para", secao: "Métodos Intervencionistas / Terapêuticos Por Imagem (4.08.13.00-2)" },
  { codigo: "40813169", descricao: "Angioplastia venosa para tratamento de síndrome", secao: "Métodos Intervencionistas / Terapêuticos Por Imagem (4.08.13.00-2)" },
  { codigo: "40813401", descricao: "Aterectomia percutânea orientada por RX", secao: "Métodos Intervencionistas / Terapêuticos Por Imagem (4.08.13.00-2)" },
  { codigo: "40813860", descricao: "Celostomia percutânea orientada por RX ou TC", secao: "Métodos Intervencionistas / Terapêuticos Por Imagem (4.08.13.00-2)" },
  { codigo: "40813843", descricao: "Colecistostomia percutânea orientada", secao: "Métodos Intervencionistas / Terapêuticos Por Imagem (4.08.13.00-2)" },
  { codigo: "40813231", descricao: "Colocação de cateter venoso central ou portocath", secao: "Métodos Intervencionistas / Terapêuticos Por Imagem (4.08.13.00-2)" },
  { codigo: "40813215", descricao: "Colocação de stent aórtico", secao: "Métodos Intervencionistas / Terapêuticos Por Imagem (4.08.13.00-2)" },
  { codigo: "40813320", descricao: "Colocação de stent biliar", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813258", descricao: "Colocação de stent em artéria visceral -", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813290", descricao: "Colocação de stent em estenose vascular", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813193", descricao: "Colocação de stent em ramo intracraniano -", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813304", descricao: "Colocação de stent em traquéia ou brônquio", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813207", descricao: "Colocação de stent em tronco supra-aórtico", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813312", descricao: "Colocação de stent esofagiano, duodenal", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813266", descricao: "Colocação de stent para tratamento de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813223", descricao: "Colocação de stent para tratamento de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813339", descricao: "Colocação de stent renal", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813274", descricao: "Colocação de stent revestido (stent-graft)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813282", descricao: "Colocação de stent revestido (stent-graft)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813347", descricao: "Colocação percutânea de cateter pielovesical", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813355", descricao: "Colocação percutânea de stent vascular", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813371", descricao: "Dilatação percutânea de estenose biliar", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813380", descricao: "Dilatação percutânea de estenose de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813398", descricao: "Dilatação percutânea de estenose de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813436", descricao: "Drenagem de abscesso pulmonar ou", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813444", descricao: "Drenagem mediastinal orientada por", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813460", descricao: "Drenagem percutânea de abscesso", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813509", descricao: "Drenagem percutânea de abscesso renal", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813525", descricao: "Drenagem percutânea de abscesso", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813479", descricao: "Drenagem percutânea de cisto hepático", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813495", descricao: "Drenagem percutânea de cisto renal", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813452", descricao: "Drenagem percutânea de coleção infectada", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813517", descricao: "Drenagem percutânea de coleção infectada", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813410", descricao: "Drenagem percutânea de coleção pleural", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813428", descricao: "Drenagem percutânea de pneumotórax", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813487", descricao: "Drenagem percutânea de via biliar", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813665", descricao: "Embolização arterial para tratamento de priapismo", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813606", descricao: "Embolização brônquica para tratamento de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813541", descricao: "Embolização de aneurisma cerebral por oclusão", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813550", descricao: "Embolização de aneurisma cerebral por oclusão", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813592", descricao: "Embolização de aneurisma ou pseudoaneurisma", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813703", descricao: "Embolização de artéria renal para nefrectomia", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813746", descricao: "Embolização de artéria uterina para tratamento", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813576", descricao: "Embolização de fístula arteriovenosa em", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813711", descricao: "Embolização de fístula arteriovenosa não", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813630", descricao: "Embolização de hemorragia digestiva", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813568", descricao: "Embolização de malformação arteriovenosa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813720", descricao: "Embolização de malformação vascular - por vaso", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813738", descricao: "Embolização de pseudoaneurisma - por vaso", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813649", descricao: "Embolização de ramo portal", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813681", descricao: "Embolização de ramos hipogástricos para", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813789", descricao: "Embolização de tumor de cabeça e pescoço", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813797", descricao: "Embolização de tumor do aparelho digestivo", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813800", descricao: "Embolização de tumor ósseo ou de partes moles", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813622", descricao: "Embolização de varizes esofagianas ou gástricas", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813754", descricao: "Embolização de veia espermática para tratamento", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813762", descricao: "Embolização de veias ovarianas para tratamento", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813657", descricao: "Embolização esplênica para tratamento de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813584", descricao: "Embolização para tratamento de epistaxe", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813673", descricao: "Embolização para tratamento de impotência", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813614", descricao: "Embolização pulmonar para tratamento de fístula", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813690", descricao: "Embolização seletiva de fístula ou aneurisma", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813851", descricao: "Esclerose percutânea de cisto pancreático", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40814165", descricao: "Esclerose percutânea de nódulos benignos dirigida", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813894", descricao: "Exérese percutânea de tumor benigno orientada", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813835", descricao: "Gastrostomia percutânea orientada por RX ou TC", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813940", descricao: "Implante de endoprótese em aneurisma de aorta", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813959", descricao: "Implante de endoprótese em dissecção de aorta", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40814114", descricao: "Litotripsia mecânica de cálculos renais orientada", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40814157", descricao: "Manipulação de drenos pós-drenagem (orientada", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813878", descricao: "Nefrostomia percutânea orientada por RX, US, TC", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40814092", descricao: "Osteoplastia ou discectomia percutânea", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40814149", descricao: "Paracentese orientada por RX ou US", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813916", descricao: "Quimioembolização para tratamento de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813908", descricao: "Quimioterapia por cateter de tumor de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813924", descricao: "Quimioterapia por cateter intra-arterial", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40814050", descricao: "Repermeabilização tubária para tratamento de", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40814068", descricao: "Retirada percutânea de cálculos biliares", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40814076", descricao: "Retirada percutânea de cálculos renais", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40814084", descricao: "Retirada percutânea de corpo estranho", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813932", descricao: "TIPS - anastomose porto-cava percutânea para", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813827", descricao: "Traqueotomia percutânea orientada", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813967", descricao: "Tratamento de pseudoaneurisma por", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813975", descricao: "Tratamento do vasoespasmo pós-trauma", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813983", descricao: "Trombectomia mecânica para tratamento de TEP", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40813991", descricao: "Trombectomia mecânica venosa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40814017", descricao: "Trombectomia medicamentosa para", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40814025", descricao: "Trombólise medicamentosa arterial ou venosa -", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40814033", descricao: "Trombólise medicamentosa arterial ou venosa para", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40814041", descricao: "Trombólise medicamentosa em troncos supra-", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40899004", descricao: "INSTRUÇÕES ESPECÍFICAS PARA MÉTODOS DIAGNÓSTICOS E INTERVENCIONISTAS POR IMAGEM", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40901181", descricao: "Abdome inferior feminino (bexiga, útero, ovário e anexos)", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901173", descricao: "Abdome inferior masculino (bexiga, próstata", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901130", descricao: "Abdome superior (fígado, vias biliares, vesícula,", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901122", descricao: "Abdome total (abdome superior, rins, bexiga, aorta,", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901769", descricao: "Aparelho urinário (rins, ureteres e bexiga)", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901220", descricao: "Articular (por articulação)", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901190", descricao: "Dermatológico - pele e subcutâneo", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901475", descricao: "Doppler colorido arterial de membro inferior - unilateral", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901459", descricao: "Doppler colorido arterial de membro superior - unilateral", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901394", descricao: "Doppler colorido de aorta e artérias renais", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901408", descricao: "Doppler colorido de aorta e ilíacas", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901513", descricao: "Doppler colorido de artérias penianas (sem fármaco indução)", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901416", descricao: "Doppler colorido de artérias viscerais (mesentéricas", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901424", descricao: "Doppler colorido de hemangioma", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901386", descricao: "Doppler colorido de órgão ou estrutura isolada", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901360", descricao: "Doppler colorido de vasos cervicais arteriais bilateral", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901378", descricao: "Doppler colorido de vasos cervicais venosos bilateral", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901432", descricao: "Doppler colorido de veia cava superior ou inferior", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901440", descricao: "Doppler colorido peniano com fármaco-indução", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901351", descricao: "Doppler colorido transfontanela", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901483", descricao: "Doppler colorido venoso de membro inferior - unilateral", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901467", descricao: "Doppler colorido venoso de membro superior - unilateral", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901602", descricao: "Doppler transcraniano", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901629", descricao: "Ecodopplercardiograma com avaliação do", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901050", descricao: "Ecodopplercardiograma com contraste intracavitário", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901068", descricao: "Ecodopplercardiograma com contraste para perfusão", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901076", descricao: "Ecodopplercardiograma com estresse farmacológico", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901696", descricao: "Ecodopplercardiograma com estresse físico", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901084", descricao: "Ecodopplercardiograma fetal com mapeamento de", secao: "Ultrassonografia Diagnóstica (4.09.01.00-9)" },
  { codigo: "40901718", descricao: "Ecodopplercardiograma para ajuste de marca-passo", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40901700", descricao: "Ecodopplercardiograma sob estresse físico ou", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40901092", descricao: "Ecodopplercardiograma transesofágico (inclui", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40901106", descricao: "Ecodopplercardiograma transtorácico", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40901033", descricao: "Glândulas salivares (todas)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40901017", descricao: "Globo ocular - bilateral", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40901025", descricao: "Globo ocular com Doppler colorido - bilateral", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40901114", descricao: "Mamas", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40901238", descricao: "Obstétrica", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40901297", descricao: "Obstétrica 1º trimestre (endovaginal)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40901254", descricao: "Obstétrica com translucência nucal", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40901246", descricao: "Obstétrica convencional com Doppler colorido", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40901289", descricao: "Obstétrica gestação múltipla com Doppler colorido:", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40901270", descricao: "Obstétrica gestação múltipla: cada feto", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40901262", descricao: "Obstétrica morfológica", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40901750", descricao: "Próstata (via abdominal)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40901335", descricao: "Próstata transretal (não inclui abdome inferior masculino)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40901149", descricao: "Retroperitônio (grandes vasos ou adrenais)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40901041", descricao: "Torácico extracardíaco", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40901300", descricao: "Transvaginal (útero, ovário, anexos e vagina)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40901319", descricao: "Transvaginal para controle de ovulação (3 ou mais exames)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40901491", descricao: "Tridimensional - acrescentar ao exame de base", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40902064", descricao: "Doppler colorido intra-operatório", secao: "Ultrassonografia Intervencionista (4.09.02.00-5)" },
  { codigo: "40902110", descricao: "Drenagem percutânea orientada por US (acrescentar o", secao: "Ultrassonografia Intervencionista (4.09.02.00-5)" },
  { codigo: "40902145", descricao: "Ecodopplercardiograma intracardíaco", secao: "Ultrassonografia Intervencionista (4.09.02.00-5)" },
  { codigo: "40902080", descricao: "Ecodopplercardiograma transoperatório (transesofágico", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40902072", descricao: "Ecodopplercardiograma transoperatório (transesofágico", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40902056", descricao: "Intra-operatório", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40902137", descricao: "Monitorização por Doppler transcraniano", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40902021", descricao: "Obstétrica 1º trimestre com punção: biópsia ou aspirativa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40902013", descricao: "Obstétrica: com amniocentese", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40902030", descricao: "Próstata transretal com biópsia - até 8 fragmentos", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40902048", descricao: "Próstata transretal com biópsia - mais de 8 fragmentos", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "40902129", descricao: "Redução de invaginação intestinal por enema, orientada", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41001109", descricao: "Abdome superior", secao: "Tomografia Computadorizada Diagnóstica (4.10.01.00-1)" },
  { codigo: "41001095", descricao: "Abdome total (abdome superior, pelve e retroperitônio)", secao: "Tomografia Computadorizada Diagnóstica (4.10.01.00-1)" },
  { codigo: "41001141", descricao: "Articulação (esternoclavicular ou ombro ou cotovelo", secao: "Tomografia Computadorizada Diagnóstica (4.10.01.00-1)" },
  { codigo: "41001044", descricao: "Articulações temporomandibulares", secao: "Tomografia Computadorizada Diagnóstica (4.10.01.00-1)" },
  { codigo: "41001133", descricao: "Coluna - segmento adicional", secao: "Tomografia Computadorizada Diagnóstica (4.10.01.00-1)" },
  { codigo: "41001125", descricao: "Coluna cervical ou dorsal ou lombar (até 3 segmentos)", secao: "Tomografia Computadorizada Diagnóstica (4.10.01.00-1)" },
  { codigo: "41001087", descricao: "Coração - para avaliação do escore de cálcio coronariano", secao: "Tomografia Computadorizada Diagnóstica (4.10.01.00-1)" },
  { codigo: "41001010", descricao: "Crânio ou sela túrcica ou órbitas", secao: "Tomografia Computadorizada Diagnóstica (4.10.01.00-1)" },
  { codigo: "41001052", descricao: "Dental (dentascan)", secao: "Tomografia Computadorizada Diagnóstica (4.10.01.00-1)" },
  { codigo: "41001214", descricao: "Endoscopia virtual de qualquer órgão ou estrutura", secao: "Tomografia Computadorizada Diagnóstica (4.10.01.00-1)" },
  { codigo: "41001192", descricao: "Escanometria digital", secao: "Tomografia Computadorizada Diagnóstica (4.10.01.00-1)" },
  { codigo: "41001036", descricao: "Face ou seios da face", secao: "Tomografia Computadorizada Diagnóstica (4.10.01.00-1)" },
  { codigo: "41001028", descricao: "Mastóides ou orelhas", secao: "Tomografia Computadorizada Diagnóstica (4.10.01.00-1)" },
  { codigo: "41001117", descricao: "Pelve ou bacia", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41001060", descricao: "Pescoço (partes moles, laringe, tireóide, faringe e", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41001206", descricao: "Reconstrução tridimensional de qualquer órgão ou região -", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41001150", descricao: "Segmento apendicular (braço ou antebraço ou mão ou", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41001222", descricao: "TC para PET dedicado oncológico", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41001079", descricao: "Tórax", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41002032", descricao: "Drenagem percutânea orientada por TC (acrescentar o", secao: "Tomografia Computadorizada Intervencionista (4.10.02.00-8)" },
  { codigo: "41002040", descricao: "Punção para introdução de contraste (acrescentar o", secao: "Tomografia Computadorizada Intervencionista (4.10.02.00-8)" },
  { codigo: "41101170", descricao: "Abdome superior (fígado, pâncreas, baço, rins,", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101510", descricao: "Angio-RM arterial de abdome superior", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101537", descricao: "Angio-RM arterial de crânio", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101553", descricao: "Angio-RM arterial de membro inferior (unilateral)", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101570", descricao: "Angio-RM arterial de membro superior (unilateral)", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101596", descricao: "Angio-RM arterial de pelve", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101618", descricao: "Angio-RM arterial de pescoço", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101499", descricao: "Angio-RM arterial pulmonar", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101340", descricao: "Angio-RM de aorta abdominal", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101332", descricao: "Angio-RM de aorta torácica", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101529", descricao: "Angio-RM venosa de abdome superior", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101545", descricao: "Angio-RM venosa de crânio", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101561", descricao: "Angio-RM venosa de membro inferior (unilateral)", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101588", descricao: "Angio-RM venosa de membro superior (unilateral)", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101600", descricao: "Angio-RM venosa de pelve", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101626", descricao: "Angio-RM venosa de pescoço", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101502", descricao: "Angio-RM venosa pulmonar", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101103", descricao: "Articulação temporomandibular (bilateral)", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101316", descricao: "Articular (por articulação)", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101278", descricao: "Bacia (articulações sacroilíacas)", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101030", descricao: "Base do crânio", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101219", descricao: "Bolsa escrotal", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101227", descricao: "Coluna cervical ou dorsal ou lombar", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101138", descricao: "Coração - morfológico e funcional", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101146", descricao: "Coração - morfológico e funcional + perfusão + estresse", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101154", descricao: "Coração - morfológico e funcional + perfusão +", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101286", descricao: "Coxa (unilateral)", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101014", descricao: "Crânio (encéfalo)", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101634", descricao: "Endorretal", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101642", descricao: "Endovaginal", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101375", descricao: "Endoscopia virtual por RM - acrescentar ao exame de base", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101065", descricao: "Espectroscopia por RM", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101049", descricao: "Estudo funcional (mapeamento cortical por RM)", secao: "Ressonância Magnética Diagnóstica (4.11.01.00-6)" },
  { codigo: "41101090", descricao: "Face (inclui seios da face)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41101197", descricao: "Fetal", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41101235", descricao: "Fluxo liquórico (como complementar)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41101359", descricao: "Hidro-RM (colângio-RM ou uro-RM ou mielo-RM ou", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41101480", descricao: "Mama (bilateral)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41101260", descricao: "Mão (não inclui punho)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41101251", descricao: "Membro superior unilateral (não inclui mão e articulações)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41101073", descricao: "Órbita bilateral", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41101081", descricao: "Ossos temporais bilateral", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41101308", descricao: "Pé (antepé) - não inclui tornozelo", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41101189", descricao: "Pelve (não inclui articulações coxofemorais)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41101200", descricao: "Pênis", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41101057", descricao: "Perfusão cerebral por RM", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41101294", descricao: "Perna (unilateral)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41101111", descricao: "Pescoço (nasofaringe, orofaringe, laringe, traquéia,", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41101383", descricao: "Reconstrução tridimensional - acrescentar ao exame", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41101120", descricao: "Tórax (mediastino, pulmão, parede torácica)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41102010", descricao: "Artro-RM (incluir a punção articular) - por articulação", secao: "Ressonância Magnética Intervencionista (4.11.02.00-2)" },
  { codigo: "41203011", descricao: "Betaterapia (placa de estrôncio) - por campo", secao: "Procedimentos / Técnicas De Radioterapia Externa (4.12.03.00-3)" },
  { codigo: "41203020", descricao: "Radiocirurgia (RTC) - nível 1, lesão única e/ou um isocentro - por tratamento", secao: "Procedimentos / Técnicas De Radioterapia Externa (4.12.03.00-3)" },
  { codigo: "41203038", descricao: "Radiocirurgia (RTC) - nível 2, duas lesões e/ou dois a quatro isocentros -", secao: "Procedimentos / Técnicas De Radioterapia Externa (4.12.03.00-3)" },
  { codigo: "41203046", descricao: "Radiocirurgia (RTC) - nível 3, três lesões e/ou de mais de quatro isocentros -", secao: "Procedimentos / Técnicas De Radioterapia Externa (4.12.03.00-3)" },
  { codigo: "41203054", descricao: "Radioterapia com Modulação da Intensidade do Feixe (IMRT) - por tratamento", secao: "Procedimentos / Técnicas De Radioterapia Externa (4.12.03.00-3)" },
  { codigo: "41203062", descricao: "Radioterapia Conformada Tridimensional (RCT-3D) com Acelerador Linear -", secao: "Procedimentos / Técnicas De Radioterapia Externa (4.12.03.00-3)" },
  { codigo: "41203070", descricao: "Radioterapia Convencional de Megavoltagem com Acelerador Linear com", secao: "Procedimentos / Técnicas De Radioterapia Externa (4.12.03.00-3)" },
  { codigo: "41203089", descricao: "Radioterapia Convencional de Megavoltagem com Acelerador Linear só com", secao: "Procedimentos / Técnicas De Radioterapia Externa (4.12.03.00-3)" },
  { codigo: "41203097", descricao: "Radioterapia Convencional de Megavoltagem com Unidade de Telecobalto -", secao: "Procedimentos / Técnicas De Radioterapia Externa (4.12.03.00-3)" },
  { codigo: "41203100", descricao: "Radioterapia de Corpo Inteiro - por tratamento", secao: "Procedimentos / Técnicas De Radioterapia Externa (4.12.03.00-3)" },
  { codigo: "41203119", descricao: "Radioterapia de Meio Corpo (HBI) - por dia de tratamento", secao: "Procedimentos / Técnicas De Radioterapia Externa (4.12.03.00-3)" },
  { codigo: "41203127", descricao: "Radioterapia de Pele Total (TSI) - por tratamento", secao: "Procedimentos / Técnicas De Radioterapia Externa (4.12.03.00-3)" },
  { codigo: "41203135", descricao: "Radioterapia Estereotática - 1º dia de tratamento", secao: "Procedimentos / Técnicas De Radioterapia Externa (4.12.03.00-3)" },
  { codigo: "41203143", descricao: "Radioterapia Estereotática - por dia subsequente", secao: "Procedimentos / Técnicas De Radioterapia Externa (4.12.03.00-3)" },
  { codigo: "41203151", descricao: "Radioterapia Externa de Ortovoltagem (Roentgenterapia) - por campo", secao: "Procedimentos / Técnicas De Radioterapia Externa (4.12.03.00-3)" },
  { codigo: "41203160", descricao: "Radioterapia Intra-operatória (IORT) - por tratamento", secao: "Procedimentos / Técnicas De Radioterapia Externa (4.12.03.00-3)" },
  { codigo: "41203178", descricao: "Radioterapia Rotatória com acelerador linear com fótons e", secao: "Procedimentos / Técnicas De Radioterapia Externa (4.12.03.00-3)" },
  { codigo: "41203186", descricao: "Radioterapia Rotatória com acelerador linear só com fótons -", secao: "Procedimentos / Técnicas De Radioterapia Externa (4.12.03.00-3)" },
  { codigo: "41203194", descricao: "Radioterapia Rotatória com unidade de cobalto - por volume tratado e por dia", secao: "Procedimentos / Técnicas De Radioterapia Externa (4.12.03.00-3)" },
  { codigo: "41203208", descricao: "Sangues e derivados (por unidade)", secao: "Procedimentos / Técnicas De Radioterapia Externa (4.12.03.00-3)" },
  { codigo: "41204018", descricao: "Colimação individual - 1 por incidência planejada", secao: "Procedimentos Secundários De Radioterapia Externa (4.12.04.00-0)" },
  { codigo: "41204034", descricao: "Planejamento de tratamento computadorizado - 1 por volume tratado", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41204042", descricao: "Planejamento de tratamento computadorizado tridimensional -", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41204050", descricao: "Planejamento de tratamento simples (não computadorizado) -", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41204093", descricao: "Sistemas de imobilização - cabeça (máscaras) ou membros -", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41204107", descricao: "Sistemas de imobilização - tórax, abdome ou pélvis - 1 por tratamento", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41205014", descricao: "Braquiterapia endoluminal de alta taxa de dose (BATD) - por inserção", secao: "Procedimentos De Braquiterapia (4.12.05.00-6)" },
  { codigo: "41205022", descricao: "Braquiterapia endoluminal de baixa taxa de dose (BBTD) - por inserção", secao: "Procedimentos De Braquiterapia (4.12.05.00-6)" },
  { codigo: "41205030", descricao: "Braquiterapia intersticial de alta taxa de dose (BATD) - por inserção", secao: "Procedimentos De Braquiterapia (4.12.05.00-6)" },
  { codigo: "41205049", descricao: "Braquiterapia intersticial de baixa taxa de dose (BBTD) - com Césio -", secao: "Procedimentos De Braquiterapia (4.12.05.00-6)" },
  { codigo: "41205065", descricao: "Braquiterapia intersticial de baixa taxa de dose (BBTD) com ouro,", secao: "Procedimentos De Braquiterapia (4.12.05.00-6)" },
  { codigo: "41205057", descricao: "Braquiterapia intersticial de baixa taxa de dose (BBTD)", secao: "Procedimentos De Braquiterapia (4.12.05.00-6)" },
  { codigo: "41205073", descricao: "Braquiterapia intracavitária de alta taxa de dose (BATD) - por inserção", secao: "Procedimentos De Braquiterapia (4.12.05.00-6)" },
  { codigo: "41205081", descricao: "Braquiterapia intracavitária de baixa taxa de dose (BBTD) com Césio -", secao: "Procedimentos De Braquiterapia (4.12.05.00-6)" },
  { codigo: "41205090", descricao: "Braquiterapia oftálmica de baixa taxa de dose (BBTD) - por inserção", secao: "Procedimentos De Braquiterapia (4.12.05.00-6)" },
  { codigo: "41205103", descricao: "Braquiterapia por moldagem ou contato de baixa taxa de dose", secao: "Procedimentos De Braquiterapia (4.12.05.00-6)" },
  { codigo: "41205111", descricao: "Braquiterapia por moldagem ou contato de baixa taxa de dose", secao: "Procedimentos De Braquiterapia (4.12.05.00-6)" },
  { codigo: "41205120", descricao: "Braquiterapia por moldagem ou contato, de alta taxa de dose", secao: "Procedimentos De Braquiterapia (4.12.05.00-6)" },
  { codigo: "41206029", descricao: "Colocação ou retirada da placa oftálmica - 1 colocação e 1 retirada por tratamento", secao: "Procedimentos Secundários De Braquiterapia (4.12.06.00-2)" },
  { codigo: "41206037", descricao: "Colocação ou retirada dos cateteres - 1 colocação e 1 retirada por inserção", secao: "Procedimentos Secundários De Braquiterapia (4.12.06.00-2)" },
  { codigo: "41206045", descricao: "Planejamento computadorizado de braquiterapia - 1 por inserção", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41206053", descricao: "Planejamento computadorizado tridimensional de braquiterapia - 1 por inserção", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41206061", descricao: "Planejamento não-computadorizado de braquiterapia - 1 por por inserção", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41206070", descricao: "Simulação de braquiterapia - 1 por inserção", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41301404", descricao: "Avaliação da função muscular por movimento manual (por membro)", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301170", descricao: "Avaliação de vias lacrimais - monocular", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301030", descricao: "Avaliação órbito-palpebral-exoftalmometria - binocular", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301048", descricao: "Bioimpedanciometria (ambulatorial) exame", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301056", descricao: "Biópsia do vilo corial", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301412", descricao: "Calorimetria direta", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301064", descricao: "Calorimetria indireta (ambulatorial) exame", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301072", descricao: "Campimetria manual - monocular", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301382", descricao: "Capilaroscopia periungueal", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301080", descricao: "Ceratoscopia computadorizada - monocular", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301099", descricao: "Coleta de material cérvico-vaginal", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301102", descricao: "Colposcopia (cérvice uterina e vagina)", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301536", descricao: "Colposcopia anal", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301544", descricao: "Colposcopia por vídeo", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301110", descricao: "Cordocentese", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301129", descricao: "Curva tensional diária - binocular", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301137", descricao: "Dermatoscopia (por lesão)", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301145", descricao: "Ereção fármaco-induzida", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301153", descricao: "Estéreo-foto de papila - monocular", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301161", descricao: "Estesiometria (por membro)", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301188", descricao: "Exame a fresco do conteúdo vaginal e cervical", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301200", descricao: "Exame de motilidade ocular (teste ortóptico) - binocular", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301226", descricao: "Exame micológico direto (por local)", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301234", descricao: "Fotodermatoscopia (por lesão)", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301242", descricao: "Gonioscopia - binocular", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301250", descricao: "Mapeamento de retina (oftalmoscopia indireta) - monocular", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301269", descricao: "Microscopia especular de córnea - monocular", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301277", descricao: "Oftalmodinamometria - monocular", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301285", descricao: "Peniscopia (inclui bolsa escrotal)", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301307", descricao: "Potencial de acuidade visual - monocular", secao: "Procedimentos (4.13.01.00-5)" },
  { codigo: "41301323", descricao: "Tonometria - binocular", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41301331", descricao: "Tricograma", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41301340", descricao: "Urodinâmica completa", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41301366", descricao: "Visão subnormal - monocular", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41301374", descricao: "Vulvoscopia (vulva e períneo)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41301552", descricao: "Vulvoscopia por vídeo", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41401018", descricao: "Avaliação da função muscular (por movimento) com equipamento", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401026", descricao: "Avaliação da função muscular (por movimento) com equipamento", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401514", descricao: "Oximetria não invasiva", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401042", descricao: "Prova de auto-rotação cefálica", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401050", descricao: "Prova de Lombard", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401069", descricao: "Provas imuno-alérgicas para bactérias (por antígeno)", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401077", descricao: "Provas imuno-alérgicas para fungos (por antígeno)", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401557", descricao: "Repertorização", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401530", descricao: "Teste cutâneo-alérgicos Epitelis de Animais", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401522", descricao: "Teste cutâneo-alérgicos para látex", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401085", descricao: "Teste da histamina (duas áreas testadas)", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401093", descricao: "Teste de adaptação patológica (tone decay test)", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401565", descricao: "Teste de avaliação geriátrica global", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401107", descricao: "Teste de broncoprovocação", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401115", descricao: "Teste de caminhada de 6 minutos", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401123", descricao: "Teste de desempenho anaeróbico em laboratório (T. de Wingate)", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401131", descricao: "Teste de equilíbrio peritoneal (PET)", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401662", descricao: "Teste de estimulação músculo-esquelética “in vitro” (mínimo seis)", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401140", descricao: "Teste de exercício dos 4 segundos", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401158", descricao: "Teste de exercício em ergômetro com determinação do lactato sanguíneo", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401166", descricao: "Teste de exercício em ergômetro com realização de gasometria arterial", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401174", descricao: "Teste de exercício em ergômetro com monitorização da frequência cardíaca", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401182", descricao: "Teste de exercício em ergômetro com monitorização do eletrocardiograma", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401190", descricao: "Teste de exercício em ergômetro com medida de gases expirados", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401204", descricao: "Teste de exercício em ergômetro com medida de gases expirados", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401212", descricao: "Teste de glicerol (com audiometria tonal limiar pré e pós)", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401239", descricao: "Teste de Hilger para paralisia facial", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401247", descricao: "Teste de Huhner", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401255", descricao: "Teste de Mitsuda", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401549", descricao: "Teste de monitorização contínua da glicose (TMCG)", secao: "Procedimentos (4.14.01.00-0)" },
  { codigo: "41401263", descricao: "Teste de prótese auditiva", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41401271", descricao: "Teste de sensibilidade de contraste ou de cores - monocular", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41401280", descricao: "Teste de SISI", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41401298", descricao: "Teste para broncoespasmo de exercício", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41401301", descricao: "Teste provocativo para glaucoma - binocular", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41401719", descricao: "Teste rápido para detecção da PAMG-1 para diagnóstico de ruptura", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41401310", descricao: "Testes aeróbicos em campo com determinação do lactato sanguíneo", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41401328", descricao: "Testes aeróbicos em campo com medida de gases expirados", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41401336", descricao: "Testes aeróbicos em campo com telemetria da frequência", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41401344", descricao: "Testes anaeróbicos em campo com determinação do lactato sanguíneo", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41401352", descricao: "Testes anaeróbicos em campo sem determinação do lactato sanguíneo", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41401360", descricao: "Testes cutâneo-alérgicos para alérgenos da poeira", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41401379", descricao: "Testes cutâneo-alérgicos para alimentos", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41401387", descricao: "Testes cutâneo-alérgicos para fungos", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41401395", descricao: "Testes cutâneo-alérgicos para insetos hematófagos", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41401409", descricao: "Testes cutâneo-alérgicos para pólens", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41401417", descricao: "Testes de aptidão em laboratório (agilidade, equilíbrio,", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41401425", descricao: "Testes de contato - até 30 substâncias", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41401433", descricao: "Testes de contato - por substância, acima de 30", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41401441", descricao: "Testes de contato por fotossensibilização - até 30 substâncias", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41401450", descricao: "Testes de contato por fotossensibilização - por substância, acima de 30", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41401468", descricao: "Testes do desenvolvimento (escala de Denver e outras)", secao: "Procedimentos Diagnósticos E Terapêuticos" },
  { codigo: "41501012", descricao: "Biometria ultrassônica - monocular", secao: "Procedimentos Diagnósticos (4.15.01.00-4)" },
  { codigo: "41501020", descricao: "Cavernosometria", secao: "Procedimentos Diagnósticos (4.15.01.00-4)" },
  { codigo: "41501047", descricao: "Dopplermetria dos cordões espermáticos", secao: "Procedimentos Diagnósticos (4.15.01.00-4)" },
  { codigo: "41501071", descricao: "Investigação ultrassônica com teste de stress e com registro", secao: "Procedimentos Diagnósticos (4.15.01.00-4)" },
  { codigo: "41501080", descricao: "Investigação ultrassônica com teste de stress e sem registro", secao: "Procedimentos Diagnósticos (4.15.01.00-4)" },
  { codigo: "41501098", descricao: "Investigação ultrassônica com teste de stress em esteira e", secao: "Procedimentos Diagnósticos (4.15.01.00-4)" },
  { codigo: "41501209", descricao: "Medida de pressão hepática", secao: "Procedimentos Diagnósticos (4.15.01.00-4)" },
  { codigo: "41501187", descricao: "Medida de pressão segmentar (nos quatro segmentos)", secao: "Procedimentos Diagnósticos (4.15.01.00-4)" },
  { codigo: "41501128", descricao: "Paquimetria ultrassônica - monocular", secao: "Procedimentos Diagnósticos (4.15.01.00-4)" },
  { codigo: "41501136", descricao: "Termometria cutânea (por lateralidade: pescoço, membros, bolsa", secao: "Procedimentos Diagnósticos (4.15.01.00-4)" },
];

// ── CONSTANTES ────────────────────────────────────────────────────────
const CBHPM_VERSOES = ["CBHPM 2010", "CBHPM 2012", "CBHPM 2015", "CBHPM 2022"];
const TIPO_TABELA = [
  { id: "cbhpm", label: "CBHPM", icon: "📋" },
  { id: "pacote", label: "Pacote", icon: "📦" },
  { id: "negociacao", label: "Negociação Direta", icon: "🤝" },
  { id: "particular", label: "Particular", icon: "💰" },
];
const TABS = [
  { id: "novo", label: "Novo Paciente", icon: "🏥" },
  { id: "realizadas", label: "Realizadas", icon: "📅" },
  { id: "pendentes", label: "Pendentes", icon: "⏳" },
  { id: "pagas", label: "Pagas", icon: "✅" },
  { id: "config", label: "Config", icon: "⚙️" },
];
const MESES = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const PAPEIS = [
  { id: "cirurgiao", label: "Cirurgião", pct: 1.0, color: "#7eb8f7" },
  { id: "aux1", label: "1º Auxiliar", pct: 0.3, color: "#f0a855" },
  { id: "aux2", label: "2º Auxiliar", pct: 0.2, color: "#c47ef5" },
];

const inputStyle = { width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, color: "#f0f0f0", padding: "11px 14px", fontSize: 14, fontFamily: "'Sora', sans-serif", outline: "none", boxSizing: "border-box" };
const selectStyle = { ...inputStyle, background: "#0f1923" };

// ── HELPERS ───────────────────────────────────────────────────────────
function Badge({ tipo }) {
  const map = { cbhpm: { bg: "#1a3a5c", color: "#7eb8f7", label: "CBHPM" }, pacote: { bg: "#1a3a2e", color: "#5ecf8a", label: "Pacote" }, negociacao: { bg: "#3a2a1a", color: "#f0a855", label: "Neg. Direta" }, particular: { bg: "#2e1a3a", color: "#c47ef5", label: "Particular" } };
  const s = map[tipo] || { bg: "#222", color: "#aaa", label: tipo };
  return <span style={{ background: s.bg, color: s.color, borderRadius: 6, padding: "2px 10px", fontSize: 11, fontWeight: 700, letterSpacing: 0.5, fontFamily: "'DM Mono', monospace" }}>{s.label}</span>;
}
function iconBtn(bg, color) { return { background: bg, border: "none", borderRadius: 8, color, cursor: "pointer", padding: "6px 10px", fontSize: 14 }; }
function Modal({ title, onClose, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 1000, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#0f1923", borderRadius: "24px 24px 0 0", padding: "28px 20px 40px", width: "100%", maxWidth: 480, maxHeight: "92vh", overflowY: "auto", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 -8px 40px rgba(0,0,0,0.5)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontFamily: "'Sora', sans-serif", color: "#f0f0f0" }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#888", fontSize: 22, cursor: "pointer" }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={{ display: "block", fontSize: 12, color: "#7eb8f7", fontFamily: "'DM Mono', monospace", marginBottom: 6, letterSpacing: 0.5 }}>{label}</label>}
      {children}
    </div>
  );
}

// ── ABA: NOVO PACIENTE ────────────────────────────────────────────────
function NovoPaciente({ convenios, cirurgiasRecorrentes, hospitais, onSalvar }) {
  const hoje = new Date().toISOString().split("T")[0];
  const [paciente, setPaciente] = useState({ nome: "", idade: "", prontuario: "", hospital: "", data: hoje, imagens: [] });
  const [convenioId, setConvenioId] = useState("");
  const [busca, setBusca] = useState("");
  const [codigos, setCodigos] = useState([]);
  const [papel, setPapel] = useState("cirurgiao");
  const [nomeCirurgia, setNomeCirurgia] = useState("");
  const [observacao, setObservacao] = useState("");
  const [valorParticular, setValorParticular] = useState("");
  const [showManual, setShowManual] = useState(false);
  const [codigoManual, setCodigoManual] = useState("");
  const [descManual, setDescManual] = useState("");

  const resultados = useMemo(() => {
    if (busca.trim().length < 2) return [];
    const termo = busca.trim().toLowerCase();
    const num = busca.replace(/\D/g, "");
    return CBHPM_TORACICA.filter(p => {
      const porNome = p.descricao.toLowerCase().includes(termo);
      const porCodigo = num.length >= 2 && p.codigo.includes(num);
      return porNome || porCodigo;
    }).slice(0, 10);
  }, [busca]);

  function adicionarCodigo(proc) {
    if (codigos.find(c => c.codigo === proc.codigo)) return;
    setCodigos(prev => [...prev, { codigo: proc.codigo, descricao: proc.descricao, qtd: 1 }]);
    if (!nomeCirurgia) setNomeCirurgia(proc.descricao);
    setBusca("");
  }
  function adicionarRecorrente(cir) {
    cir.codigos.forEach(c => {
      if (!codigos.find(x => x.codigo === c.codigo))
        setCodigos(prev => [...prev, { ...c, qtd: 1 }]);
    });
    if (!nomeCirurgia) setNomeCirurgia(cir.nome);
  }
  function adicionarManual() {
    if (!codigoManual.trim() || !descManual.trim()) return;
    setCodigos(prev => [...prev, { codigo: codigoManual.trim(), descricao: descManual.trim(), qtd: 1 }]);
    setCodigoManual(""); setDescManual(""); setShowManual(false);
  }

  const convenioSel = convenios.find(c => String(c.id) === String(convenioId));
  const canSave = paciente.nome.trim() && convenioId && codigos.length > 0 && paciente.data;

  function handleSalvar() {
    onSalvar({
      id: Date.now(),
      paciente: { ...paciente },
      convenioId,
      convenioNome: convenioSel?.nome || "",
      convenioTipo: convenioSel?.tipo || "",
      valorParticular: valorParticular || "",
      codigos,
      papel,
      nomeCirurgia: nomeCirurgia || codigos[0]?.descricao || "",
      observacao,
      pago: false,
      dataPagamento: null,
    });
    // Reset
    setPaciente({ nome: "", idade: "", prontuario: "", hospital: "", data: hoje, imagens: [] });
    setConvenioId(""); setBusca(""); setCodigos([]); setPapel("cirurgiao");
    setNomeCirurgia(""); setObservacao("");
  }

  return (
    <div>
      {/* DADOS DO PACIENTE */}
      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "16px 18px", marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: "#7eb8f7", fontFamily: "'DM Mono', monospace", marginBottom: 12, letterSpacing: 0.5 }}>👤 DADOS DO PACIENTE</div>
        <input value={paciente.nome} onChange={e => setPaciente(p => ({ ...p, nome: e.target.value }))} placeholder="Nome do paciente" style={{ ...inputStyle, marginBottom: 10 }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
          <input value={paciente.idade} onChange={e => setPaciente(p => ({ ...p, idade: e.target.value }))} placeholder="Idade" type="number" style={inputStyle} />
          <input value={paciente.prontuario} onChange={e => setPaciente(p => ({ ...p, prontuario: e.target.value }))} placeholder="Nº Prontuário" style={inputStyle} />
        </div>
        <select value={paciente.hospital} onChange={e => setPaciente(p => ({ ...p, hospital: e.target.value }))} style={{ ...selectStyle, marginBottom: 10 }}>
          <option value="">Selecione o hospital...</option>
          {(hospitais || []).filter(h => h.ativo).map(h => <option key={h.id} value={h.nome}>{h.nome}</option>)}
        </select>
        <input value={paciente.data} onChange={e => setPaciente(p => ({ ...p, data: e.target.value }))} type="date" style={inputStyle} />
        {/* Imagens */}
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 11, color: "#7eb8f7", fontFamily: "'DM Mono', monospace", marginBottom: 8, letterSpacing: 0.5 }}>📎 DESCRIÇÃO CIRÚRGICA</div>
          <label style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.18)", borderRadius: 10, padding: "10px 14px", cursor: "pointer", color: "#888", fontSize: 13, fontFamily: "'Sora', sans-serif" }}>
            <span style={{ fontSize: 18 }}>📷</span><span>Adicionar foto / imagem</span>
            <input type="file" accept="image/*" multiple style={{ display: "none" }} onChange={e => {
              Array.from(e.target.files).forEach(file => {
                const reader = new FileReader();
                reader.onload = ev => setPaciente(p => ({ ...p, imagens: [...p.imagens, { nome: file.name, data: ev.target.result }] }));
                reader.readAsDataURL(file);
              });
            }} />
          </label>
          {paciente.imagens.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
              {paciente.imagens.map((img, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <img src={img.data} alt={img.nome} style={{ width: 68, height: 68, objectFit: "cover", borderRadius: 8, border: "1px solid rgba(255,255,255,0.12)" }} />
                  <button onClick={() => setPaciente(p => ({ ...p, imagens: p.imagens.filter((_, j) => j !== i) }))} style={{ position: "absolute", top: -6, right: -6, background: "#f07070", border: "none", borderRadius: "50%", width: 20, height: 20, color: "#fff", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CONVÊNIO */}
      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "16px 18px", marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: "#7eb8f7", fontFamily: "'DM Mono', monospace", marginBottom: 12, letterSpacing: 0.5 }}>🏥 CONVÊNIO</div>
        {convenios.length === 0 ? (
          <div style={{ fontSize: 13, color: "#555", textAlign: "center", padding: "10px 0" }}>Cadastre convênios em ⚙️ Configurações</div>
        ) : (
          <select value={convenioId} onChange={e => setConvenioId(e.target.value)} style={selectStyle}>
            <option value="">Selecione o convênio...</option>
            {convenios.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
          </select>
        )}
        {convenioSel && (
          <div style={{ marginTop: 8 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
              {convenioSel.tabelaConfigurada && <Badge tipo={convenioSel.tipo} />}
              {convenioSel.tipo === "cbhpm" && <span style={{ fontSize: 11, color: "#7eb8f7", fontFamily: "'DM Mono', monospace" }}>{convenioSel.cbhpmVersao}</span>}
              {convenioSel.tipo === "negociacao" && convenioSel.valorNegociado && (
                <span style={{ fontSize: 12, color: "#5ecf8a", fontFamily: "'DM Mono', monospace" }}>R$ {parseFloat(convenioSel.valorNegociado).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
              )}
              {!convenioSel.tabelaConfigurada && <span style={{ fontSize: 11, color: "#f0a855", fontFamily: "'DM Mono', monospace" }}>⚠️ Configure a tabela em ⚙️</span>}
            </div>
            {convenioSel.nome === "Particular" && (
              <div>
                <label style={{ display: "block", fontSize: 12, color: "#7eb8f7", fontFamily: "'DM Mono', monospace", marginBottom: 6, letterSpacing: 0.5 }}>VALOR DA EQUIPE (R$)</label>
                <input type="number" value={valorParticular} onChange={e => setValorParticular(e.target.value)} placeholder="Valor total da equipe" style={inputStyle} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* PAPEL NA CIRURGIA */}
      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "16px 18px", marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: "#7eb8f7", fontFamily: "'DM Mono', monospace", marginBottom: 12, letterSpacing: 0.5 }}>🔪 SEU PAPEL NA CIRURGIA</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {PAPEIS.map(p => (
            <button key={p.id} onClick={() => setPapel(p.id)} style={{ background: papel === p.id ? `rgba(${p.id === "cirurgiao" ? "126,184,247" : p.id === "aux1" ? "240,168,85" : "196,126,245"},0.15)` : "rgba(255,255,255,0.04)", border: papel === p.id ? `1.5px solid ${p.color}` : "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "10px 6px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: papel === p.id ? p.color : "#aaa", fontFamily: "'Sora', sans-serif" }}>{p.label}</span>
              <span style={{ fontSize: 10, color: papel === p.id ? p.color : "#555", fontFamily: "'DM Mono', monospace" }}>{Math.round(p.pct * 100)}%</span>
            </button>
          ))}
        </div>
      </div>

      {/* PROCEDIMENTOS */}
      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "16px 18px", marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: "#7eb8f7", fontFamily: "'DM Mono', monospace", marginBottom: 12, letterSpacing: 0.5 }}>🔍 PROCEDIMENTOS CBHPM</div>

        {/* Cirurgias recorrentes */}
        {cirurgiasRecorrentes.length > 0 && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#888", fontFamily: "'DM Mono', monospace", marginBottom: 8 }}>RECORRENTES — toque para adicionar:</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {cirurgiasRecorrentes.map(cir => (
                <button key={cir.id} onClick={() => adicionarRecorrente(cir)} style={{ background: "rgba(26,108,240,0.1)", border: "1px solid rgba(26,108,240,0.25)", borderRadius: 20, padding: "5px 12px", color: "#7eb8f7", fontSize: 12, fontFamily: "'Sora', sans-serif", cursor: "pointer" }}>
                  {cir.nome}
                </button>
              ))}
            </div>
          </div>
        )}

        <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar por nome ou código..." style={{ ...inputStyle, marginBottom: busca.trim().length >= 2 ? 8 : 0 }} />

        {resultados.length > 0 && (
          <div style={{ marginBottom: 8 }}>
            {resultados.map((p, i) => {
              const sel = codigos.find(c => c.codigo === p.codigo);
              return (
                <button key={i} onClick={() => adicionarCodigo(p)} disabled={!!sel} style={{ width: "100%", background: sel ? "rgba(94,207,138,0.06)" : "rgba(26,108,240,0.06)", border: `1px solid ${sel ? "rgba(94,207,138,0.3)" : "rgba(26,108,240,0.15)"}`, borderRadius: 10, padding: "9px 12px", marginBottom: 5, cursor: sel ? "default" : "pointer", display: "flex", alignItems: "flex-start", gap: 10, textAlign: "left" }}>
                  <span style={{ background: sel ? "#1a3a2e" : "#1a3a5c", color: sel ? "#5ecf8a" : "#7eb8f7", borderRadius: 6, padding: "2px 7px", fontSize: 11, fontFamily: "'DM Mono', monospace", fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>{p.codigo}</span>
                  <span style={{ fontSize: 12, color: sel ? "#5ecf8a" : "#ccc", lineHeight: 1.4, flex: 1 }}>{p.descricao}</span>
                  {sel && <span style={{ color: "#5ecf8a", flexShrink: 0 }}>✓</span>}
                </button>
              );
            })}
          </div>
        )}

        {codigos.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 11, color: "#7eb8f7", fontFamily: "'DM Mono', monospace", marginBottom: 8 }}>ADICIONADOS ({codigos.length})</div>
            {codigos.map((c, i) => (
              <div key={i} style={{ background: "rgba(26,108,240,0.08)", border: "1px solid rgba(26,108,240,0.2)", borderRadius: 10, padding: "10px 12px", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ background: "#1a3a5c", color: "#7eb8f7", borderRadius: 6, padding: "2px 7px", fontSize: 11, fontFamily: "'DM Mono', monospace", fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>{c.codigo}</span>
                  <span style={{ fontSize: 12, color: "#ccc", flex: 1, lineHeight: 1.4 }}>{c.descricao}</span>
                  <button onClick={() => setCodigos(prev => prev.filter((_, j) => j !== i))} style={{ background: "none", border: "none", color: "#f07070", cursor: "pointer", fontSize: 15, padding: 0, flexShrink: 0 }}>✕</button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                  <span style={{ fontSize: 11, color: "#888", fontFamily: "'DM Mono', monospace" }}>QTD:</span>
                  <button onClick={() => setCodigos(prev => prev.map((x, j) => j === i ? { ...x, qtd: Math.max(1, (x.qtd || 1) - 1) } : x))} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 6, color: "#f0f0f0", width: 26, height: 26, fontSize: 15, cursor: "pointer" }}>−</button>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#f0f0f0", fontFamily: "'DM Mono', monospace", minWidth: 20, textAlign: "center" }}>{c.qtd || 1}</span>
                  <button onClick={() => setCodigos(prev => prev.map((x, j) => j === i ? { ...x, qtd: (x.qtd || 1) + 1 } : x))} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 6, color: "#f0f0f0", width: 26, height: 26, fontSize: 15, cursor: "pointer" }}>＋</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!showManual ? (
          <button onClick={() => setShowManual(true)} style={{ width: "100%", marginTop: 8, background: "rgba(94,207,138,0.08)", border: "1px dashed rgba(94,207,138,0.3)", borderRadius: 10, padding: "9px", color: "#5ecf8a", fontSize: 12, fontFamily: "'Sora', sans-serif", cursor: "pointer" }}>＋ Adicionar código manualmente</button>
        ) : (
          <div style={{ background: "rgba(94,207,138,0.05)", border: "1px solid rgba(94,207,138,0.2)", borderRadius: 10, padding: "12px", marginTop: 8 }}>
            <input value={codigoManual} onChange={e => setCodigoManual(e.target.value)} placeholder="Número do código" style={{ ...inputStyle, marginBottom: 8 }} />
            <input value={descManual} onChange={e => setDescManual(e.target.value)} placeholder="Descrição" style={{ ...inputStyle, marginBottom: 8 }} />
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => { setShowManual(false); setCodigoManual(""); setDescManual(""); }} style={{ flex: 1, background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px", color: "#888", fontSize: 13, fontFamily: "'Sora', sans-serif", cursor: "pointer" }}>Cancelar</button>
              <button onClick={adicionarManual} style={{ flex: 2, background: "rgba(94,207,138,0.2)", border: "1px solid rgba(94,207,138,0.4)", borderRadius: 8, padding: "8px", color: "#5ecf8a", fontSize: 13, fontWeight: 700, fontFamily: "'Sora', sans-serif", cursor: "pointer" }}>Adicionar</button>
            </div>
          </div>
        )}
      </div>

      {/* NOME E OBSERVAÇÃO */}
      <Field label="NOME DA CIRURGIA">
        <input value={nomeCirurgia} onChange={e => setNomeCirurgia(e.target.value)} placeholder="Preenchido automaticamente ou edite" style={inputStyle} />
      </Field>
      <Field label="OBSERVAÇÃO (opcional)">
        <textarea value={observacao} onChange={e => setObservacao(e.target.value)} placeholder="Notas clínicas..." style={{ ...inputStyle, resize: "vertical", minHeight: 60 }} />
      </Field>

      <button onClick={handleSalvar} disabled={!canSave} style={{ width: "100%", background: !canSave ? "#1a2a3a" : "linear-gradient(135deg, #1a6cf0, #0a4db5)", color: !canSave ? "#555" : "#fff", border: "none", borderRadius: 14, padding: "15px", fontSize: 15, fontWeight: 700, fontFamily: "'Sora', sans-serif", cursor: !canSave ? "not-allowed" : "pointer", marginTop: 4 }}>
        Salvar Cirurgia
      </button>
    </div>
  );
}

// ── ABA: REALIZADAS ───────────────────────────────────────────────────
function TabRealizadas({ registros, onMarcarPago, onRemover }) {
  const [mesSel, setMesSel] = useState(null);

  const porMes = useMemo(() => {
    const mapa = {};
    registros.forEach(r => {
      const d = new Date(r.paciente.data + "T12:00:00");
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const label = `${MESES[d.getMonth()]} ${d.getFullYear()}`;
      if (!mapa[key]) mapa[key] = { key, label, items: [] };
      mapa[key].items.push(r);
    });
    return Object.values(mapa).sort((a, b) => b.key.localeCompare(a.key));
  }, [registros]);

  if (registros.length === 0) return <div style={{ textAlign: "center", color: "#444", padding: "60px 0", fontSize: 14 }}>Nenhuma cirurgia registrada ainda</div>;

  return (
    <div>
      {/* Seletor de mês */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 16 }}>
        <button onClick={() => setMesSel(null)} style={{ background: !mesSel ? "rgba(26,108,240,0.3)" : "rgba(255,255,255,0.05)", border: !mesSel ? "1px solid #1a6cf0" : "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "5px 14px", color: !mesSel ? "#7eb8f7" : "#666", fontSize: 12, fontFamily: "'Sora', sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>Todos</button>
        {porMes.map(m => (
          <button key={m.key} onClick={() => setMesSel(m.key)} style={{ background: mesSel === m.key ? "rgba(26,108,240,0.3)" : "rgba(255,255,255,0.05)", border: mesSel === m.key ? "1px solid #1a6cf0" : "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "5px 14px", color: mesSel === m.key ? "#7eb8f7" : "#666", fontSize: 12, fontFamily: "'Sora', sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>{m.label}</button>
        ))}
      </div>

      {porMes.filter(m => !mesSel || m.key === mesSel).map(m => (
        <div key={m.key} style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: "#7eb8f7", fontFamily: "'DM Mono', monospace", letterSpacing: 1, marginBottom: 10 }}>{m.label.toUpperCase()} — {m.items.length} CIRURGIA{m.items.length > 1 ? "S" : ""}</div>
          {m.items.map(r => {
            const papelInfo = PAPEIS.find(p => p.id === r.papel);
            return (
              <div key={r.id} style={{ background: !r.pago ? "rgba(240,112,112,0.07)" : r.pagoParcial ? "rgba(240,200,60,0.07)" : "rgba(94,207,138,0.07)", border: `1px solid ${!r.pago ? "rgba(240,112,112,0.25)" : r.pagoParcial ? "rgba(240,200,60,0.3)" : "rgba(94,207,138,0.25)"}`, borderRadius: 14, padding: "14px 16px", marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#f0f0f0", fontFamily: "'Sora', sans-serif" }}>{r.paciente.nome}</div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{r.nomeCirurgia}</div>
                    <div style={{ fontSize: 11, color: "#666", marginTop: 4, fontFamily: "'DM Mono', monospace" }}>
                      {r.convenioNome} · {r.paciente.hospital} · {new Date(r.paciente.data + "T12:00:00").toLocaleDateString("pt-BR")}
                    </div>
                    <div style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: papelInfo?.color || "#aaa", fontFamily: "'DM Mono', monospace", background: "rgba(255,255,255,0.06)", borderRadius: 6, padding: "2px 8px" }}>{papelInfo?.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: !r.pago ? "#f07070" : r.pagoParcial ? "#f0c83c" : "#5ecf8a" }}>{!r.pago ? "● PENDENTE" : r.pagoParcial ? "⚠️ PAGO PARCIAL" : "✓ PAGO"}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginLeft: 8 }}>
                    <button onClick={() => onRemover(r.id)} style={iconBtn("#3a1a1a", "#f07070")}>🗑</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ── ABA: PENDENTES / PAGAS ────────────────────────────────────────────
function TabFiltrada({ registros, pago, onMarcarPago, onRemover }) {
  const lista = registros.filter(r => r.pago === pago);

  const porMes = useMemo(() => {
    const mapa = {};
    lista.forEach(r => {
      const d = new Date(r.paciente.data + "T12:00:00");
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const label = `${MESES[d.getMonth()]} ${d.getFullYear()}`;
      if (!mapa[key]) mapa[key] = { key, label, items: [] };
      mapa[key].items.push(r);
    });
    return Object.values(mapa).sort((a, b) => b.key.localeCompare(a.key));
  }, [lista]);

  if (lista.length === 0) return <div style={{ textAlign: "center", color: "#444", padding: "60px 0", fontSize: 14 }}>{pago ? "Nenhuma cirurgia paga ainda" : "Nenhuma cirurgia pendente"}</div>;

  return (
    <div>
      {porMes.map(m => (
        <div key={m.key} style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: "#7eb8f7", fontFamily: "'DM Mono', monospace", letterSpacing: 1, marginBottom: 10 }}>{m.label.toUpperCase()} — {m.items.length}</div>
          {m.items.map(r => {
            const papelInfo = PAPEIS.find(p => p.id === r.papel);
            return (
              <div key={r.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "14px 16px", marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#f0f0f0", fontFamily: "'Sora', sans-serif" }}>{r.paciente.nome}</div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{r.nomeCirurgia}</div>
                    <div style={{ fontSize: 11, color: "#666", marginTop: 4, fontFamily: "'DM Mono', monospace" }}>
                      {r.convenioNome} · {r.paciente.hospital} · {new Date(r.paciente.data + "T12:00:00").toLocaleDateString("pt-BR")}
                    </div>
                    <div style={{ marginTop: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: papelInfo?.color || "#aaa", fontFamily: "'DM Mono', monospace", background: "rgba(255,255,255,0.06)", borderRadius: 6, padding: "2px 8px" }}>{papelInfo?.label}</span>
                    </div>
                    {r.codigos?.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
                        {r.codigos.map((c, i) => <span key={i} style={{ background: "#1a3a5c", color: "#7eb8f7", borderRadius: 6, padding: "2px 7px", fontSize: 10, fontFamily: "'DM Mono', monospace" }}>{c.codigo}{c.qtd > 1 ? ` x${c.qtd}` : ""}</span>)}
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginLeft: 8 }}>
                    {!pago && <button onClick={() => onMarcarPago(r.id)} style={{ ...iconBtn("rgba(94,207,138,0.15)", "#5ecf8a"), fontSize: 12, padding: "5px 10px", borderRadius: 8, border: "1px solid rgba(94,207,138,0.3)" }}>✓ Pago</button>}
                    <button onClick={() => onRemover(r.id)} style={iconBtn("#3a1a1a", "#f07070")}>🗑</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}


// ── PAGAMENTOS CONFIG ─────────────────────────────────────────────────
function PagamentosConfig({ registros, setRegistros }) {
  const [mes, setMes] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
  });
  const [uploads, setUploads] = useState([]);
  const [processando, setProcessando] = useState(false);
  const [resultado, setResultado] = useState(null);

  async function processarPDF(file) {
    setProcessando(true);
    setResultado(null);
    try {
      const base64 = await new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = ev => res(ev.target.result.split(",")[1]);
        reader.onerror = rej;
        reader.readAsDataURL(file);
      });

      // Apenas pendentes, com nome + convênio + códigos
      const pendentes = registros.filter(r => !r.pago).map(r => ({
        id: r.id,
        paciente: r.paciente.nome,
        convenio: r.convenioNome,
        codigos: r.codigos?.map(c => c.codigo) || [],
        nomeCirurgia: r.nomeCirurgia,
      }));

      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2000,
          messages: [{
            role: "user",
            content: [
              { type: "document", source: { type: "base64", media_type: "application/pdf", data: base64 } },
              { type: "text", text: `Este é um documento de pagamento de honorários médicos de um convênio.

REGRA DE CRUZAMENTO — siga esta ordem obrigatória:
1. PRIMEIRO: identifique os registros pelo NOME DO PACIENTE + CONVÊNIO. Somente avance se ambos coincidirem.
2. SEGUNDO: para cada registro identificado no passo 1, verifique se os CÓDIGOS CBHPM do sistema constam no PDF.
   - Se TODOS os códigos do sistema constam no PDF → status "completo"
   - Se ALGUNS códigos estão ausentes no PDF → status "parcial" (liste quais códigos faltaram)

Cirurgias pendentes no sistema:
${JSON.stringify(pendentes, null, 2)}

Retorne APENAS JSON válido (sem markdown, sem texto extra):
{
  "encontrados": [
    {
      "id": 123,
      "paciente": "Nome",
      "convenio": "Convênio",
      "status": "completo",
      "codigos_no_pdf": ["30803080"],
      "codigos_ausentes": []
    }
  ],
  "nao_identificados": ["item do PDF sem correspondência pelo nome+convênio"]
}` }
            ]
          }]
        })
      });

      const data = await resp.json();
      const texto = data.content?.map(b => b.text || "").join("") || "";
      const parsed = JSON.parse(texto.replace(/```json|```/g, "").trim());

      if (parsed.encontrados?.length > 0) {
        setRegistros(prev => prev.map(r => {
          const match = parsed.encontrados.find(e => e.id === r.id);
          if (!match) return r;
          return {
            ...r,
            pago: true,
            pagoParcial: match.status === "parcial",
            codigosAusentes: match.codigos_ausentes || [],
            dataPagamento: new Date().toISOString(),
          };
        }));
      }

      setUploads(prev => [...prev, {
        nome: file.name,
        completos: parsed.encontrados?.filter(e => e.status === "completo").length || 0,
        parciais: parsed.encontrados?.filter(e => e.status === "parcial").length || 0,
        nao: parsed.nao_identificados?.length || 0,
      }]);
      setResultado(parsed);
    } catch(e) {
      setResultado({ erro: "Erro ao processar o PDF. Tente novamente." });
    }
    setProcessando(false);
  }

  const [ano, mesNum] = mes.split("-");
  const mesLabel = `${MESES[parseInt(mesNum)-1]} ${ano}`;

  return (
    <div>
      <Field label="MÊS DE REFERÊNCIA">
        <input type="month" value={mes} onChange={e => setMes(e.target.value)} style={inputStyle} />
      </Field>
      <div style={{ fontSize: 11, color: "#888", fontFamily: "'DM Mono', monospace", marginBottom: 14 }}>
        Upload dos PDFs de pagamento referentes a {mesLabel}. Pode enviar vários arquivos.
      </div>

      <label style={{ display: "flex", alignItems: "center", gap: 12, background: processando ? "rgba(255,255,255,0.02)" : "rgba(26,108,240,0.08)", border: processando ? "1px solid rgba(255,255,255,0.1)" : "1px dashed rgba(26,108,240,0.4)", borderRadius: 14, padding: "16px", cursor: processando ? "not-allowed" : "pointer", marginBottom: 16 }}>
        <span style={{ fontSize: 28 }}>{processando ? "⏳" : "📄"}</span>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: processando ? "#555" : "#7eb8f7", fontFamily: "'Sora', sans-serif" }}>
            {processando ? "Processando PDF..." : "Upload de comprovante de pagamento"}
          </div>
          <div style={{ fontSize: 11, color: "#555", marginTop: 3, fontFamily: "'DM Mono', monospace" }}>
            Leitura por nome + convênio → verificação de códigos
          </div>
        </div>
        <input type="file" accept=".pdf" multiple style={{ display: "none" }} disabled={processando}
          onChange={e => Array.from(e.target.files).forEach(f => processarPDF(f))} />
      </label>

      {resultado && !resultado.erro && (
        <div style={{ marginBottom: 16 }}>
          {resultado.encontrados?.filter(e => e.status === "completo").length > 0 && (
            <div style={{ background: "rgba(94,207,138,0.08)", border: "1px solid rgba(94,207,138,0.25)", borderRadius: 12, padding: "12px 14px", marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#5ecf8a", marginBottom: 6 }}>
                ✅ {resultado.encontrados.filter(e => e.status === "completo").length} pago(s) integralmente
              </div>
              {resultado.encontrados.filter(e => e.status === "completo").map((e, i) => (
                <div key={i} style={{ fontSize: 12, color: "#ccc", marginBottom: 2 }}>• {e.paciente} — {e.convenio}</div>
              ))}
            </div>
          )}
          {resultado.encontrados?.filter(e => e.status === "parcial").length > 0 && (
            <div style={{ background: "rgba(240,200,60,0.08)", border: "1px solid rgba(240,200,60,0.3)", borderRadius: 12, padding: "12px 14px", marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#f0c83c", marginBottom: 6 }}>
                ⚠️ {resultado.encontrados.filter(e => e.status === "parcial").length} pago(s) parcialmente
              </div>
              {resultado.encontrados.filter(e => e.status === "parcial").map((e, i) => (
                <div key={i} style={{ fontSize: 12, color: "#ccc", marginBottom: 4 }}>
                  • {e.paciente} — {e.convenio}
                  {e.codigos_ausentes?.length > 0 && (
                    <div style={{ fontSize: 11, color: "#f0a855", marginTop: 2, paddingLeft: 8 }}>
                      Códigos não encontrados: {e.codigos_ausentes.join(", ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {resultado.nao_identificados?.length > 0 && (
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>Itens no PDF sem correspondência:</div>
              {resultado.nao_identificados.map((n, i) => <div key={i} style={{ fontSize: 11, color: "#555", marginBottom: 2 }}>• {n}</div>)}
            </div>
          )}
        </div>
      )}
      {resultado?.erro && (
        <div style={{ background: "rgba(240,112,112,0.1)", border: "1px solid rgba(240,112,112,0.3)", borderRadius: 10, padding: "12px 14px", marginBottom: 12, fontSize: 13, color: "#f07070" }}>
          {resultado.erro}
        </div>
      )}

      {uploads.length > 0 && (
        <div>
          <div style={{ fontSize: 11, color: "#7eb8f7", fontFamily: "'DM Mono', monospace", marginBottom: 8, letterSpacing: 0.5 }}>UPLOADS DESTA SESSÃO</div>
          {uploads.map((u, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 14px", marginBottom: 6 }}>
              <div style={{ fontSize: 13, color: "#f0f0f0", marginBottom: 4 }}>📄 {u.nome}</div>
              <div style={{ display: "flex", gap: 12 }}>
                {u.completos > 0 && <span style={{ fontSize: 11, color: "#5ecf8a" }}>✅ {u.completos} completo{u.completos !== 1 ? "s" : ""}</span>}
                {u.parciais > 0 && <span style={{ fontSize: 11, color: "#f0c83c" }}>⚠️ {u.parciais} parcial{u.parciais !== 1 ? "is" : ""}</span>}
                {u.nao > 0 && <span style={{ fontSize: 11, color: "#666" }}>❌ {u.nao} sem match</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── ABA: CONFIGURAÇÕES ────────────────────────────────────────────────
function TabConfig({ convenios, setConvenios, cirurgiasRec, setCirurgiasRec, registros, setRegistros, hospitais, setHospitais }) {
  const [abaConfig, setAbaConfig] = useState("convenios");
  const [convenioSel, setConvenioSel] = useState(null);
  const [showCirForm, setShowCirForm] = useState(false);
  const [editingCir, setEditingCir] = useState(null);

  function salvarCir(cir) {
    if (editingCir) setCirurgiasRec(prev => prev.map(c => c.id === cir.id ? cir : c));
    else setCirurgiasRec(prev => [...prev, cir]);
    setShowCirForm(false); setEditingCir(null);
  }

  // Subpanel para configurar um convênio específico
  function ConvenioConfigPanel({ conv, onClose }) {
    const [tipo, setTipo] = useState(conv.tipo || "");
    const [cbhpmVersao, setCbhpmVersao] = useState(conv.cbhpmVersao || "");
    const [valorNegociado, setValorNegociado] = useState(conv.valorNegociado || "");
    const [nomePacote, setNomePacote] = useState(conv.nomePacote || "");
    const [pdfNome, setPdfNome] = useState(conv.pdfNome || "");
    const [pdfLoading, setPdfLoading] = useState(false);

    function handlePdf(e) {
      const file = e.target.files[0];
      if (!file) return;
      setPdfLoading(true);
      const reader = new FileReader();
      reader.onload = ev => { setPdfNome(file.name); setPdfLoading(false); };
      reader.onerror = () => setPdfLoading(false);
      reader.readAsDataURL(file);
    }

    const canSave = tipo && (tipo === "cbhpm" ? cbhpmVersao : tipo === "pacote" ? true : tipo === "particular" ? true : valorNegociado);

    function handleSave() {
      setConvenios(prev => prev.map(c => c.id === conv.id
        ? { ...c, tipo, cbhpmVersao: tipo === "cbhpm" ? cbhpmVersao : "", valorNegociado: (tipo === "negociacao") ? valorNegociado : "", nomePacote: tipo === "pacote" ? nomePacote : "", pdfNome, tabelaConfigurada: true }
        : c
      ));
      onClose();
    }

    return (
      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "18px", marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#f0f0f0", fontFamily: "'Sora', sans-serif" }}>{conv.nome}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#888", fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>

        <label style={{ display: "block", fontSize: 12, color: "#7eb8f7", fontFamily: "'DM Mono', monospace", marginBottom: 10, letterSpacing: 0.5 }}>TIPO DE TABELA</label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
          {TIPO_TABELA.map(t => (
            <button key={t.id} onClick={() => setTipo(t.id)} style={{ background: tipo === t.id ? "rgba(26,108,240,0.25)" : "rgba(255,255,255,0.04)", border: tipo === t.id ? "1.5px solid #1a6cf0" : "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "10px 8px", cursor: "pointer", color: tipo === t.id ? "#7eb8f7" : "#aaa", fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 600 }}>
              <div style={{ fontSize: 18, marginBottom: 3 }}>{t.icon}</div>{t.label}
            </button>
          ))}
        </div>

        {tipo === "cbhpm" && (
          <Field label="VERSÃO CBHPM">
            <select value={cbhpmVersao} onChange={e => setCbhpmVersao(e.target.value)} style={selectStyle}>
              <option value="">Selecione...</option>
              {CBHPM_VERSOES.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </Field>
        )}
        {tipo === "pacote" && (
          <>
            <Field label="NOME DO PACOTE">
              <input value={nomePacote} onChange={e => setNomePacote(e.target.value)} placeholder="Ex: Pacote Cirurgia Torácica" style={inputStyle} />
            </Field>
            <Field label="TABELA DE VALORES (PDF)">
              <label style={{ display: "flex", alignItems: "center", gap: 10, background: pdfNome ? "rgba(94,207,138,0.08)" : "rgba(255,255,255,0.04)", border: pdfNome ? "1px solid rgba(94,207,138,0.4)" : "1px dashed rgba(255,255,255,0.2)", borderRadius: 10, padding: "11px 14px", cursor: "pointer", color: pdfNome ? "#5ecf8a" : "#888", fontSize: 13, fontFamily: "'Sora', sans-serif" }}>
                <span style={{ fontSize: 18 }}>{pdfLoading ? "⏳" : pdfNome ? "✅" : "📄"}</span>
                <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{pdfLoading ? "Carregando..." : pdfNome || "Fazer upload da tabela PDF"}</span>
                {pdfNome && <span onClick={e => { e.preventDefault(); setPdfNome(""); }} style={{ color: "#f07070" }}>✕</span>}
                <input type="file" accept=".pdf" style={{ display: "none" }} onChange={handlePdf} />
              </label>
            </Field>
          </>
        )}
        {tipo === "negociacao" && (
          <Field label="VALOR NEGOCIADO (R$)">
            <input type="number" value={valorNegociado} onChange={e => setValorNegociado(e.target.value)} placeholder="0,00" style={inputStyle} />
          </Field>
        )}
        {tipo === "cbhpm" && (
          <Field label="TABELA DE VALORES (PDF)">
            <label style={{ display: "flex", alignItems: "center", gap: 10, background: pdfNome ? "rgba(94,207,138,0.08)" : "rgba(255,255,255,0.04)", border: pdfNome ? "1px solid rgba(94,207,138,0.4)" : "1px dashed rgba(255,255,255,0.2)", borderRadius: 10, padding: "11px 14px", cursor: "pointer", color: pdfNome ? "#5ecf8a" : "#888", fontSize: 13, fontFamily: "'Sora', sans-serif" }}>
              <span style={{ fontSize: 18 }}>{pdfLoading ? "⏳" : pdfNome ? "✅" : "📄"}</span>
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{pdfLoading ? "Carregando..." : pdfNome || "Fazer upload da tabela PDF"}</span>
              {pdfNome && <span onClick={e => { e.preventDefault(); setPdfNome(""); }} style={{ color: "#f07070" }}>✕</span>}
              <input type="file" accept=".pdf" style={{ display: "none" }} onChange={handlePdf} />
            </label>
          </Field>
        )}

        <button onClick={handleSave} disabled={!canSave} style={{ width: "100%", marginTop: 8, background: !canSave ? "#1a2a3a" : "linear-gradient(135deg, #1a6cf0, #0a4db5)", color: !canSave ? "#555" : "#fff", border: "none", borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 700, fontFamily: "'Sora', sans-serif", cursor: !canSave ? "not-allowed" : "pointer" }}>
          Salvar Configuração
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Sub-abas */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[{ id: "convenios", label: "🏥 Convênios" }, { id: "cirurgias", label: "🫁 Cirurgias" }, { id: "hospitais", label: "🏨 Hospitais" }, { id: "pagamentos", label: "💳 Pagamentos" }].map(a => (
          <button key={a.id} onClick={() => setAbaConfig(a.id)} style={{ flex: 1, background: abaConfig === a.id ? "rgba(26,108,240,0.2)" : "rgba(255,255,255,0.04)", border: abaConfig === a.id ? "1px solid #1a6cf0" : "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px", color: abaConfig === a.id ? "#7eb8f7" : "#666", fontSize: 13, fontWeight: 600, fontFamily: "'Sora', sans-serif", cursor: "pointer" }}>{a.label}</button>
        ))}
      </div>

      {abaConfig === "convenios" && (
        <div>
          <div style={{ fontSize: 11, color: "#888", fontFamily: "'DM Mono', monospace", marginBottom: 14 }}>
            Toque em um convênio para configurar a tabela de valores
          </div>
          {convenios.map(c => (
            <div key={c.id}>
              <button onClick={() => setConvenioSel(convenioSel?.id === c.id ? null : c)} style={{ width: "100%", background: convenioSel?.id === c.id ? "rgba(26,108,240,0.12)" : "rgba(255,255,255,0.04)", border: convenioSel?.id === c.id ? "1px solid rgba(26,108,240,0.4)" : "1px solid rgba(255,255,255,0.09)", borderRadius: 14, padding: "13px 16px", marginBottom: convenioSel?.id === c.id ? 0 : 8, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottomLeftRadius: convenioSel?.id === c.id ? 0 : 14, borderBottomRightRadius: convenioSel?.id === c.id ? 0 : 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.tabelaConfigurada ? "#5ecf8a" : "#555", flexShrink: 0 }} />
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#f0f0f0", fontFamily: "'Sora', sans-serif" }}>{c.nome}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {c.tabelaConfigurada && <Badge tipo={c.tipo} />}
                  <span style={{ color: "#555", fontSize: 14 }}>{convenioSel?.id === c.id ? "▲" : "▼"}</span>
                </div>
              </button>
              {convenioSel?.id === c.id && (
                <div style={{ borderTop: "none", borderRadius: "0 0 14px 14px", marginBottom: 8 }}>
                  <ConvenioConfigPanel conv={c} onClose={() => setConvenioSel(null)} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {abaConfig === "cirurgias" && (
        <div>
          <button onClick={() => { setEditingCir(null); setShowCirForm(true); }} style={{ width: "100%", background: "rgba(26,108,240,0.12)", border: "1.5px dashed rgba(26,108,240,0.4)", borderRadius: 14, padding: "12px", color: "#7eb8f7", fontSize: 14, fontWeight: 600, fontFamily: "'Sora', sans-serif", cursor: "pointer", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <span style={{ fontSize: 18 }}>＋</span> Cadastrar Cirurgia Recorrente
          </button>
          {cirurgiasRec.length === 0 && <div style={{ textAlign: "center", color: "#444", padding: "30px 0", fontSize: 14 }}>Nenhuma cirurgia cadastrada</div>}
          {cirurgiasRec.map(c => (
            <div key={c.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 14, padding: "14px 16px", marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1, paddingRight: 10 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#f0f0f0", marginBottom: 6 }}>{c.nome}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {c.codigos?.map((cd, i) => <span key={i} style={{ background: "#1a3a5c", color: "#7eb8f7", borderRadius: 6, padding: "2px 7px", fontSize: 11, fontFamily: "'DM Mono', monospace" }}>{cd.codigo}</span>)}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => { setEditingCir(c); setShowCirForm(true); }} style={iconBtn("#1a3a5c", "#7eb8f7")}>✏️</button>
                  <button onClick={() => setCirurgiasRec(prev => prev.filter(x => x.id !== c.id))} style={iconBtn("#3a1a1a", "#f07070")}>🗑</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {abaConfig === "hospitais" && (
        <div>
          <div style={{ fontSize: 11, color: "#888", fontFamily: "'DM Mono', monospace", marginBottom: 14 }}>
            Toque no hospital para ativar ou desativar da lista
          </div>
          {hospitais.map(h => (
            <button key={h.id} onClick={() => setHospitais(prev => prev.map(x => x.id === h.id ? { ...x, ativo: !x.ativo } : x))}
              style={{ width: "100%", background: h.ativo ? "rgba(94,207,138,0.07)" : "rgba(255,255,255,0.03)", border: `1px solid ${h.ativo ? "rgba(94,207,138,0.25)" : "rgba(255,255,255,0.08)"}`, borderRadius: 12, padding: "12px 16px", marginBottom: 8, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" }}>
              <span style={{ fontSize: 13, color: h.ativo ? "#f0f0f0" : "#555", fontFamily: "'Sora', sans-serif", fontWeight: h.ativo ? 600 : 400 }}>{h.nome}</span>
              <span style={{ fontSize: 18 }}>{h.ativo ? "✅" : "⬜"}</span>
            </button>
          ))}
        </div>
      )}

      {abaConfig === "pagamentos" && (
        <PagamentosConfig registros={registros} setRegistros={setRegistros} />
      )}

      {showCirForm && (
        <Modal title={editingCir ? "Editar Cirurgia" : "Nova Cirurgia Recorrente"} onClose={() => { setShowCirForm(false); setEditingCir(null); }}>
          <CirurgiaRecorrenteForm initial={editingCir} onSave={salvarCir} onCancel={() => { setShowCirForm(false); setEditingCir(null); }} />
        </Modal>
      )}
    </div>
  );
}

// ── FORMULÁRIOS DE CONFIGURAÇÃO ───────────────────────────────────────
function ConvenioForm({ initial, onSave, onCancel }) {
  const CONVENIOS_FORTALEZA = ["Unimed Fortaleza","NotreDame Intermédica","Bradesco Saúde","SulAmérica","Amil","Porto Seguro Saúde","Golden Cross","Prevent Senior","Omint","Care Plus","Allianz Saúde","Mediservice","CAMED","Geap","Cassi","Petrobrás Saúde","Assefaz","Economus","Postal Saúde","Capesesp","Funasa","IPM","IPSEMG","Saúde Bradesco","Medial Saúde","Particular","SUS","Outros"];
  const [nome, setNome] = useState(CONVENIOS_FORTALEZA.includes(initial?.nome) ? initial.nome : (initial?.nome ? "Outros" : ""));
  const [nomeCustom, setNomeCustom] = useState(initial?.nome && !CONVENIOS_FORTALEZA.includes(initial?.nome) ? initial.nome : "");
  const [tipo, setTipo] = useState(initial?.tipo || "");
  const [cbhpmVersao, setCbhpmVersao] = useState(initial?.cbhpmVersao || "");
  const [valorNegociado, setValorNegociado] = useState(initial?.valorNegociado || "");
  const [nomePacote, setNomePacote] = useState(initial?.nomePacote || "");
  const nomeF = nome === "Outros" ? nomeCustom : nome;
  const canSave = nomeF && tipo && (tipo === "cbhpm" ? cbhpmVersao : tipo === "pacote" ? true : valorNegociado);
  return (
    <div>
      <Field label="CONVÊNIO"><select value={nome} onChange={e => setNome(e.target.value)} style={selectStyle}><option value="">Selecione...</option>{CONVENIOS_FORTALEZA.map(c => <option key={c} value={c}>{c}</option>)}</select></Field>
      {nome === "Outros" && <Field label="NOME"><input value={nomeCustom} onChange={e => setNomeCustom(e.target.value)} placeholder="Digite o nome..." style={inputStyle} /></Field>}
      <label style={{ display: "block", fontSize: 12, color: "#7eb8f7", fontFamily: "'DM Mono', monospace", marginBottom: 10, letterSpacing: 0.5 }}>TIPO DE TABELA</label>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
        {TIPO_TABELA.map(t => (
          <button key={t.id} onClick={() => setTipo(t.id)} style={{ background: tipo === t.id ? "rgba(26,108,240,0.25)" : "rgba(255,255,255,0.04)", border: tipo === t.id ? "1.5px solid #1a6cf0" : "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "12px 8px", cursor: "pointer", color: tipo === t.id ? "#7eb8f7" : "#aaa", fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 600 }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>{t.icon}</div>{t.label}
          </button>
        ))}
      </div>
      {tipo === "cbhpm" && <Field label="VERSÃO CBHPM"><select value={cbhpmVersao} onChange={e => setCbhpmVersao(e.target.value)} style={selectStyle}><option value="">Selecione...</option>{CBHPM_VERSOES.map(v => <option key={v} value={v}>{v}</option>)}</select></Field>}
      {tipo === "pacote" && <Field label="NOME DO PACOTE"><input value={nomePacote} onChange={e => setNomePacote(e.target.value)} placeholder="Ex: Pacote Cirurgia Torácica" style={inputStyle} /></Field>}
      {(tipo === "negociacao" || tipo === "particular") && <Field label="VALOR NEGOCIADO (R$)"><input type="number" value={valorNegociado} onChange={e => setValorNegociado(e.target.value)} placeholder="0,00" style={inputStyle} /></Field>}
      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        <button onClick={onCancel} style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 14, color: "#aaa", fontSize: 15, fontFamily: "'Sora', sans-serif", cursor: "pointer" }}>Cancelar</button>
        <button onClick={() => onSave({ id: initial?.id || Date.now(), nome: nomeF, tipo, cbhpmVersao: tipo === "cbhpm" ? cbhpmVersao : "", valorNegociado: (tipo === "negociacao" || tipo === "particular") ? valorNegociado : "", nomePacote: tipo === "pacote" ? nomePacote : "" })} disabled={!canSave} style={{ flex: 2, background: !canSave ? "#1a2a3a" : "linear-gradient(135deg, #1a6cf0, #0a4db5)", color: !canSave ? "#555" : "#fff", border: "none", borderRadius: 12, padding: 14, fontSize: 15, fontWeight: 700, fontFamily: "'Sora', sans-serif", cursor: !canSave ? "not-allowed" : "pointer" }}>Salvar</button>
      </div>
    </div>
  );
}

function CirurgiaRecorrenteForm({ initial, onSave, onCancel }) {
  const [nome, setNome] = useState(initial?.nome || "");
  const [busca, setBusca] = useState("");
  const [codigos, setCodigos] = useState(initial?.codigos || []);
  const [codigoManual, setCodigoManual] = useState("");
  const [descManual, setDescManual] = useState("");
  const [showManual, setShowManual] = useState(false);

  const resultados = useMemo(() => {
    if (busca.trim().length < 2) return [];
    const termo = busca.trim().toLowerCase();
    const num = busca.replace(/\D/g, "");
    return CBHPM_TORACICA.filter(p => p.descricao.toLowerCase().includes(termo) || (num.length >= 2 && p.codigo.includes(num))).slice(0, 8);
  }, [busca]);

  function adicionar(proc) {
    if (codigos.find(c => c.codigo === proc.codigo)) return;
    setCodigos(prev => [...prev, { codigo: proc.codigo, descricao: proc.descricao }]);
    if (!nome) setNome(proc.descricao);
    setBusca("");
  }

  return (
    <div>
      <Field label="NOME DA CIRURGIA">
        <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome da cirurgia recorrente" style={inputStyle} />
      </Field>
      <Field label="BUSCAR CÓDIGO CBHPM">
        <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Ex: lobectomia ou 30803080" style={inputStyle} />
      </Field>
      {resultados.map((p, i) => (
        <button key={i} onClick={() => adicionar(p)} style={{ width: "100%", background: "rgba(26,108,240,0.06)", border: "1px solid rgba(26,108,240,0.15)", borderRadius: 10, padding: "9px 12px", marginBottom: 5, cursor: "pointer", display: "flex", gap: 10, textAlign: "left" }}>
          <span style={{ background: "#1a3a5c", color: "#7eb8f7", borderRadius: 6, padding: "2px 7px", fontSize: 11, fontFamily: "'DM Mono', monospace", fontWeight: 700, whiteSpace: "nowrap" }}>{p.codigo}</span>
          <span style={{ fontSize: 12, color: "#ccc" }}>{p.descricao}</span>
        </button>
      ))}
      {codigos.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          {codigos.map((c, i) => (
            <div key={i} style={{ background: "rgba(26,108,240,0.08)", border: "1px solid rgba(26,108,240,0.2)", borderRadius: 10, padding: "9px 12px", marginBottom: 6, display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ background: "#1a3a5c", color: "#7eb8f7", borderRadius: 6, padding: "2px 7px", fontSize: 11, fontFamily: "'DM Mono', monospace", fontWeight: 700 }}>{c.codigo}</span>
              <span style={{ fontSize: 12, color: "#ccc", flex: 1 }}>{c.descricao}</span>
              <button onClick={() => setCodigos(prev => prev.filter((_, j) => j !== i))} style={{ background: "none", border: "none", color: "#f07070", cursor: "pointer", fontSize: 15 }}>✕</button>
            </div>
          ))}
        </div>
      )}
      {!showManual ? (
        <button onClick={() => setShowManual(true)} style={{ width: "100%", marginBottom: 12, background: "rgba(94,207,138,0.08)", border: "1px dashed rgba(94,207,138,0.3)", borderRadius: 10, padding: "9px", color: "#5ecf8a", fontSize: 12, fontFamily: "'Sora', sans-serif", cursor: "pointer" }}>＋ Código manual</button>
      ) : (
        <div style={{ background: "rgba(94,207,138,0.05)", border: "1px solid rgba(94,207,138,0.2)", borderRadius: 10, padding: "12px", marginBottom: 12 }}>
          <input value={codigoManual} onChange={e => setCodigoManual(e.target.value)} placeholder="Número do código" style={{ ...inputStyle, marginBottom: 8 }} />
          <input value={descManual} onChange={e => setDescManual(e.target.value)} placeholder="Descrição" style={{ ...inputStyle, marginBottom: 8 }} />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setShowManual(false)} style={{ flex: 1, background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px", color: "#888", fontSize: 13, fontFamily: "'Sora', sans-serif", cursor: "pointer" }}>Cancelar</button>
            <button onClick={() => { if (codigoManual && descManual) { setCodigos(prev => [...prev, { codigo: codigoManual.trim(), descricao: descManual.trim() }]); setCodigoManual(""); setDescManual(""); setShowManual(false); } }} style={{ flex: 2, background: "rgba(94,207,138,0.2)", border: "1px solid rgba(94,207,138,0.4)", borderRadius: 8, padding: "8px", color: "#5ecf8a", fontSize: 13, fontWeight: 700, fontFamily: "'Sora', sans-serif", cursor: "pointer" }}>Adicionar</button>
          </div>
        </div>
      )}
      <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
        <button onClick={onCancel} style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 14, color: "#aaa", fontSize: 15, fontFamily: "'Sora', sans-serif", cursor: "pointer" }}>Cancelar</button>
        <button onClick={() => onSave({ id: initial?.id || Date.now(), nome: nome.trim(), codigos })} disabled={!nome.trim() || codigos.length === 0} style={{ flex: 2, background: !nome.trim() || codigos.length === 0 ? "#1a2a3a" : "linear-gradient(135deg, #1a6cf0, #0a4db5)", color: !nome.trim() || codigos.length === 0 ? "#555" : "#fff", border: "none", borderRadius: 12, padding: 14, fontSize: 15, fontWeight: 700, fontFamily: "'Sora', sans-serif", cursor: "pointer" }}>Salvar</button>
      </div>
    </div>
  );
}


// ── SUPABASE ──────────────────────────────────────────────────────────
const SUPABASE_URL = "https://rtmiscajeiqhmvznxwmw.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0bWlzY2FqZWlxaG12em54d213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0ODY3MDYsImV4cCI6MjA5NTA2MjcwNn0.XfvdnhZHOjVXL5Uxkj0uZhkf3n1o21L5KGIkQlg2STE";

async function sbFetch(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: options.prefer || "return=representation",
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

const sb = {
  async getAll(table) { return sbFetch(table + "?order=id"); },
  async insert(table, data) { return sbFetch(table, { method: "POST", body: JSON.stringify(data) }); },
  async update(table, id, data) { return sbFetch(`${table}?id=eq.${id}`, { method: "PATCH", body: JSON.stringify(data) }); },
  async delete(table, id) { return sbFetch(`${table}?id=eq.${id}`, { method: "DELETE", prefer: "return=minimal" }}); },
  async upsert(table, data) { return sbFetch(table, { method: "POST", body: JSON.stringify(data), headers: { Prefer: "resolution=merge-duplicates,return=representation" } }); },
};

const HOSPITAIS_DEFAULT = ['Hospital São Carlos', 'Hospital Monte Klinikum', 'Hospital Geral de Fortaleza (HGF)', 'Hospital Leonardo da Vinci', 'Hospital Unimed Fortaleza', 'Hospital Geral Dr. César Cals', 'Hospital Instituto Dr. José Frota (IJF)', 'Hospital Infantil Albert Sabin', 'Hospital Universitário Walter Cantídio (HUWC)', 'Hospital de Messejana Dr. Carlos Alberto Studart', 'Hospital Maternidade Escola Assis Chateaubriand (MEAC)', 'Hospital São Mateus', 'Hospital São José (Doenças Infecciosas)'];
const CONVENIOS_DEFAULT = ['Unimed Fortaleza', 'NotreDame Intermédica', 'Bradesco Saúde', 'SulAmérica', 'Amil', 'Porto Seguro Saúde', 'Golden Cross', 'Prevent Senior', 'Omint', 'Care Plus', 'Allianz Saúde', 'Mediservice', 'CAMED', 'Geap', 'Cassi', 'Petrobrás Saúde', 'Assefaz', 'Economus', 'Postal Saúde', 'Capesesp', 'Funasa', 'IPM', 'IPSEMG', 'Saúde Bradesco', 'Medial Saúde', 'Particular', 'SUS'];

// ── APP PRINCIPAL ─────────────────────────────────────────────────────
export default function MedFee() {
  const [tab, setTab] = useState("novo");
  const [convenios, setConvenios] = useState([]);
  const [cirurgiasRec, setCirurgiasRec] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [hospitais, setHospitais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  // Carregar dados do Supabase
  async function carregarDados() {
    setLoading(true);
    try {
      const [convs, hosps, cirs, regs] = await Promise.all([
        sb.getAll("convenios"),
        sb.getAll("hospitais"),
        sb.getAll("cirurgias_recorrentes"),
        sb.getAll("registros"),
      ]);

      // Se convenios vazios, popular com defaults
      if (!convs || convs.length === 0) {
        const inserts = CONVENIOS_DEFAULT.map(nome => ({ nome, tipo: "", tabela_configurada: false }));
        const inserted = await sb.insert("convenios", inserts);
        setConvenios((inserted || []).map(c => ({ ...c, id: c.id })));
      } else {
        setConvenios(convs.map(c => ({
          id: c.id, nome: c.nome, tipo: c.tipo || "", cbhpmVersao: c.cbhpm_versao || "",
          valorNegociado: c.valor_negociado || "", nomePacote: c.nome_pacote || "",
          pdfNome: c.pdf_nome || "", tabelaConfigurada: c.tabela_configurada || false,
        })));
      }

      if (!hosps || hosps.length === 0) {
        const inserts = HOSPITAIS_DEFAULT.map(nome => ({ nome, ativo: true }));
        const inserted = await sb.insert("hospitais", inserts);
        setHospitais((inserted || []).map(h => ({ id: h.id, nome: h.nome, ativo: h.ativo })));
      } else {
        setHospitais(hosps.map(h => ({ id: h.id, nome: h.nome, ativo: h.ativo })));
      }

      setCirurgiasRec((cirs || []).map(c => ({ id: c.id, nome: c.nome, codigos: c.codigos || [] })));

      setRegistros((regs || []).map(r => ({
        id: r.id,
        paciente: r.paciente || {},
        convenioId: r.convenio_id,
        convenioNome: r.convenio_nome || "",
        convenioTipo: r.convenio_tipo || "",
        codigos: r.codigos || [],
        papel: r.papel || "cirurgiao",
        nomeCirurgia: r.nome_cirurgia || "",
        observacao: r.observacao || "",
        valorParticular: r.valor_particular || "",
        pago: r.pago || false,
        pagoParcial: r.pago_parcial || false,
        codigosAusentes: r.codigos_ausentes || [],
        dataPagamento: r.data_pagamento || null,
      })));
    } catch(e) {
      setErro("Erro ao conectar com o banco de dados. Verifique sua conexão.");
    }
    setLoading(false);
  }

  useState(() => { carregarDados(); }, []);

  async function onSalvar(registro) {
    try {
      const inserted = await sb.insert("registros", [{
        paciente: registro.paciente,
        convenio_id: registro.convenioId,
        convenio_nome: registro.convenioNome,
        convenio_tipo: registro.convenioTipo,
        codigos: registro.codigos,
        papel: registro.papel,
        nome_cirurgia: registro.nomeCirurgia,
        observacao: registro.observacao,
        valor_particular: registro.valorParticular,
        pago: false,
        pago_parcial: false,
        codigos_ausentes: [],
      }]);
      if (inserted && inserted[0]) {
        const r = inserted[0];
        setRegistros(prev => [{
          id: r.id, paciente: r.paciente, convenioId: r.convenio_id,
          convenioNome: r.convenio_nome, convenioTipo: r.convenio_tipo,
          codigos: r.codigos, papel: r.papel, nomeCirurgia: r.nome_cirurgia,
          observacao: r.observacao, valorParticular: r.valor_particular,
          pago: false, pagoParcial: false, codigosAusentes: [], dataPagamento: null,
        }, ...prev]);
      }
      setTab("realizadas");
    } catch(e) {
      alert("Erro ao salvar cirurgia. Tente novamente.");
    }
  }

  async function onMarcarPago(id) {
    try {
      await sb.update("registros", id, { pago: true, data_pagamento: new Date().toISOString() });
      setRegistros(prev => prev.map(r => r.id === id ? { ...r, pago: true, dataPagamento: new Date().toISOString() } : r));
    } catch(e) {
      alert("Erro ao marcar como pago.");
    }
  }

  async function onRemover(id) {
    try {
      await sb.delete("registros", id);
      setRegistros(prev => prev.filter(r => r.id !== id));
    } catch(e) {
      alert("Erro ao remover registro.");
    }
  }

  async function handleSetConvenios(updater) {
    const novo = typeof updater === "function" ? updater(convenios) : updater;
    setConvenios(novo);
    // Salvar alterações no Supabase
    for (const c of novo) {
      try {
        await sb.update("convenios", c.id, {
          tipo: c.tipo, cbhpm_versao: c.cbhpmVersao, valor_negociado: c.valorNegociado,
          nome_pacote: c.nomePacote, pdf_nome: c.pdfNome, tabela_configurada: c.tabelaConfigurada,
        });
      } catch(e) {}
    }
  }

  async function handleSetHospitais(updater) {
    const novo = typeof updater === "function" ? updater(hospitais) : updater;
    setHospitais(novo);
    for (const h of novo) {
      try {
        await sb.update("hospitais", h.id, { ativo: h.ativo });
      } catch(e) {}
    }
  }

  async function handleSetCirurgiasRec(updater) {
    const novo = typeof updater === "function" ? updater(cirurgiasRec) : updater;
    // Detectar nova inserção vs atualização
    const antigas = new Set(cirurgiasRec.map(c => c.id));
    for (const c of novo) {
      try {
        if (!antigas.has(c.id)) {
          const inserted = await sb.insert("cirurgias_recorrentes", [{ nome: c.nome, codigos: c.codigos }]);
          if (inserted && inserted[0]) c.id = inserted[0].id;
        } else {
          await sb.update("cirurgias_recorrentes", c.id, { nome: c.nome, codigos: c.codigos });
        }
      } catch(e) {}
    }
    // Detectar deletados
    const novosIds = new Set(novo.map(c => c.id));
    for (const c of cirurgiasRec) {
      if (!novosIds.has(c.id)) {
        try { await sb.delete("cirurgias_recorrentes", c.id); } catch(e) {}
      }
    }
    setCirurgiasRec(novo);
  }

  async function handleSetRegistros(updater) {
    const novo = typeof updater === "function" ? updater(registros) : updater;
    // Detectar atualizações (pago/pagoParcial)
    for (const r of novo) {
      const antigo = registros.find(x => x.id === r.id);
      if (antigo && (antigo.pago !== r.pago || antigo.pagoParcial !== r.pagoParcial)) {
        try {
          await sb.update("registros", r.id, {
            pago: r.pago, pago_parcial: r.pagoParcial,
            codigos_ausentes: r.codigosAusentes || [],
            data_pagamento: r.dataPagamento,
          });
        } catch(e) {}
      }
    }
    setRegistros(novo);
  }

  const TITULOS = { novo: "Novo Paciente", realizadas: "Realizadas", pendentes: "Pendentes", pagas: "Pagas", config: "Configurações" };

  if (loading) return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <div style={{ minHeight: "100vh", background: "#080f17", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Sora', sans-serif" }}>
        <div style={{ fontSize: 40, marginBottom: 20 }}>🫁</div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#f0f0f0" }}>Med<span style={{ color: "#1a6cf0" }}>Fee</span></div>
        <div style={{ fontSize: 13, color: "#555", marginTop: 10 }}>Carregando dados...</div>
      </div>
    </>
  );

  if (erro) return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <div style={{ minHeight: "100vh", background: "#080f17", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Sora', sans-serif", padding: 24 }}>
        <div style={{ fontSize: 40, marginBottom: 20 }}>⚠️</div>
        <div style={{ fontSize: 14, color: "#f07070", textAlign: "center", marginBottom: 20 }}>{erro}</div>
        <button onClick={carregarDados} style={{ background: "#1a6cf0", border: "none", borderRadius: 12, padding: "12px 24px", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Tentar novamente</button>
      </div>
    </>
  );

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <div style={{ minHeight: "100vh", background: "#080f17", fontFamily: "'Sora', sans-serif", maxWidth: 480, margin: "0 auto" }}>
        <div style={{ padding: "52px 20px 16px", background: "linear-gradient(180deg, #0d1e30 0%, #080f17 100%)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 11, color: "#7eb8f7", letterSpacing: 2, fontFamily: "'DM Mono', monospace", marginBottom: 4 }}>HONORÁRIOS CIRÚRGICOS</div>
              <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#f0f0f0", letterSpacing: -0.5 }}>Med<span style={{ color: "#1a6cf0" }}>Fee</span></h1>
            </div>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: "linear-gradient(135deg, #1a6cf0, #0a4db5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: "0 4px 20px rgba(26,108,240,0.4)" }}>🫁</div>
          </div>
          <div style={{ fontSize: 13, color: "#7eb8f7", fontWeight: 600, fontFamily: "'Sora', sans-serif", marginTop: 12 }}>{TITULOS[tab]}</div>
        </div>
        <div style={{ padding: "20px 16px 110px" }}>
          {tab === "novo" && <NovoPaciente convenios={convenios} cirurgiasRecorrentes={cirurgiasRec} hospitais={hospitais} onSalvar={onSalvar} />}
          {tab === "realizadas" && <TabRealizadas registros={registros} onMarcarPago={onMarcarPago} onRemover={onRemover} />}
          {tab === "pendentes" && <TabFiltrada registros={registros} pago={false} onMarcarPago={onMarcarPago} onRemover={onRemover} />}
          {tab === "pagas" && <TabFiltrada registros={registros} pago={true} onMarcarPago={onMarcarPago} onRemover={onRemover} />}
          {tab === "config" && <TabConfig convenios={convenios} setConvenios={handleSetConvenios} cirurgiasRec={cirurgiasRec} setCirurgiasRec={handleSetCirurgiasRec} registros={registros} setRegistros={handleSetRegistros} hospitais={hospitais} setHospitais={handleSetHospitais} />}
        </div>
        <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "rgba(8,15,23,0.97)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", padding: "10px 0 24px", zIndex: 100 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "6px 2px" }}>
              <span style={{ fontSize: 19 }}>{t.icon}</span>
              <span style={{ fontSize: 8, fontFamily: "'DM Mono', monospace", letterSpacing: 0.3, color: tab === t.id ? "#7eb8f7" : "#444", fontWeight: tab === t.id ? 700 : 400 }}>{t.label.toUpperCase()}</span>
              {tab === t.id && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#1a6cf0" } />}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
