import { routes_api, CustomAxiosResponse } from '@/api_factory/modules'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useAlert } from '@/composables/core/notification'
const createForm = {
    pickup: ref(''),
    destination: ref(''),
    day_of_week: ref(''),
    visibility: ref(''),
    route_availability_days: ref([]),
    corporate_id: ref(),
    is_future_route: false,
    is_exclusive: ref(),
    route_code: ref(''),
    info: {
        description: ref('')
    },
    // route_preview: {
    //     type: 'LineString',
    //     coordinates: [
    //         [
    //             3.56489,
    //             6.46822
    //         ],
    //         [
    //             3.56428,
    //             6.46853
    //         ],
    //         [
    //             3.56416,
    //             6.46863
    //         ],
    //         [
    //             3.56402,
    //             6.46856
    //         ],
    //         [
    //             3.56362,
    //             6.46825
    //         ],
    //         [
    //             3.56325,
    //             6.46803
    //         ],
    //         [
    //             3.56278,
    //             6.46789
    //         ],
    //         [
    //             3.56256,
    //             6.4678
    //         ],
    //         [
    //             3.56265,
    //             6.4676
    //         ],
    //         [
    //             3.56292,
    //             6.46707
    //         ],
    //         [
    //             3.5631,
    //             6.46677
    //         ],
    //         [
    //             3.56298,
    //             6.46668
    //         ],
    //         [
    //             3.56256,
    //             6.46639
    //         ],
    //         [
    //             3.56242,
    //             6.46625
    //         ],
    //         [
    //             3.56201,
    //             6.46599
    //         ],
    //         [
    //             3.56078,
    //             6.46522
    //         ],
    //         [
    //             3.55914,
    //             6.46434
    //         ],
    //         [
    //             3.5585,
    //             6.46402
    //         ],
    //         [
    //             3.55687,
    //             6.46277
    //         ],
    //         [
    //             3.55653,
    //             6.46254
    //         ],
    //         [
    //             3.55636,
    //             6.46239
    //         ],
    //         [
    //             3.55602,
    //             6.46202
    //         ],
    //         [
    //             3.55573,
    //             6.4617
    //         ],
    //         [
    //             3.55565,
    //             6.46158
    //         ],
    //         [
    //             3.5555,
    //             6.46134
    //         ],
    //         [
    //             3.5554,
    //             6.46107
    //         ],
    //         [
    //             3.55528,
    //             6.46072
    //         ],
    //         [
    //             3.55518,
    //             6.46017
    //         ],
    //         [
    //             3.55515,
    //             6.45911
    //         ],
    //         [
    //             3.55508,
    //             6.45713
    //         ],
    //         [
    //             3.55491,
    //             6.45317
    //         ],
    //         [
    //             3.55486,
    //             6.45279
    //         ],
    //         [
    //             3.5546,
    //             6.45201
    //         ],
    //         [
    //             3.55436,
    //             6.4516
    //         ],
    //         [
    //             3.55408,
    //             6.45125
    //         ],
    //         [
    //             3.55382,
    //             6.45098
    //         ],
    //         [
    //             3.5531,
    //             6.45052
    //         ],
    //         [
    //             3.55244,
    //             6.45023
    //         ],
    //         [
    //             3.54884,
    //             6.44876
    //         ],
    //         [
    //             3.54736,
    //             6.44815
    //         ],
    //         [
    //             3.54653,
    //             6.44778
    //         ],
    //         [
    //             3.54453,
    //             6.44701
    //         ],
    //         [
    //             3.54417,
    //             6.44687
    //         ],
    //         [
    //             3.54277,
    //             6.44639
    //         ],
    //         [
    //             3.54189,
    //             6.44613
    //         ],
    //         [
    //             3.5408,
    //             6.4457
    //         ],
    //         [
    //             3.53852,
    //             6.44484
    //         ],
    //         [
    //             3.53819,
    //             6.44469
    //         ],
    //         [
    //             3.53687,
    //             6.44395
    //         ],
    //         [
    //             3.53628,
    //             6.44363
    //         ],
    //         [
    //             3.53583,
    //             6.44345
    //         ],
    //         [
    //             3.53487,
    //             6.44304
    //         ],
    //         [
    //             3.53319,
    //             6.44236
    //         ],
    //         [
    //             3.53207,
    //             6.44195
    //         ],
    //         [
    //             3.53132,
    //             6.44169
    //         ],
    //         [
    //             3.5309,
    //             6.44149
    //         ],
    //         [
    //             3.53018,
    //             6.44116
    //         ],
    //         [
    //             3.52883,
    //             6.44055
    //         ],
    //         [
    //             3.52702,
    //             6.43982
    //         ],
    //         [
    //             3.52628,
    //             6.43952
    //         ],
    //         [
    //             3.52537,
    //             6.4393
    //         ],
    //         [
    //             3.52407,
    //             6.4391
    //         ],
    //         [
    //             3.52255,
    //             6.4389
    //         ],
    //         [
    //             3.52181,
    //             6.43882
    //         ],
    //         [
    //             3.5215,
    //             6.43876
    //         ],
    //         [
    //             3.51949,
    //             6.43844
    //         ],
    //         [
    //             3.51672,
    //             6.43804
    //         ],
    //         [
    //             3.51163,
    //             6.43729
    //         ],
    //         [
    //             3.50928,
    //             6.43696
    //         ],
    //         [
    //             3.50876,
    //             6.43692
    //         ],
    //         [
    //             3.50787,
    //             6.43683
    //         ],
    //         [
    //             3.50753,
    //             6.43681
    //         ],
    //         [
    //             3.50667,
    //             6.43665
    //         ],
    //         [
    //             3.50604,
    //             6.43651
    //         ],
    //         [
    //             3.50486,
    //             6.43633
    //         ],
    //         [
    //             3.5031,
    //             6.43605
    //         ],
    //         [
    //             3.50257,
    //             6.436
    //         ],
    //         [
    //             3.5022,
    //             6.43594
    //         ],
    //         [
    //             3.50034,
    //             6.43566
    //         ],
    //         [
    //             3.49712,
    //             6.43519
    //         ],
    //         [
    //             3.49402,
    //             6.43475
    //         ],
    //         [
    //             3.49074,
    //             6.4343
    //         ],
    //         [
    //             3.48868,
    //             6.43397
    //         ],
    //         [
    //             3.48592,
    //             6.43358
    //         ],
    //         [
    //             3.48301,
    //             6.43317
    //         ],
    //         [
    //             3.48252,
    //             6.4331
    //         ],
    //         [
    //             3.48224,
    //             6.43326
    //         ],
    //         [
    //             3.48218,
    //             6.43342
    //         ],
    //         [
    //             3.48209,
    //             6.43369
    //         ],
    //         [
    //             3.48201,
    //             6.43413
    //         ],
    //         [
    //             3.48174,
    //             6.43551
    //         ],
    //         [
    //             3.48175,
    //             6.43777
    //         ],
    //         [
    //             3.48181,
    //             6.44057
    //         ],
    //         [
    //             3.48182,
    //             6.44452
    //         ],
    //         [
    //             3.48186,
    //             6.44681
    //         ],
    //         [
    //             3.48188,
    //             6.44788
    //         ],
    //         [
    //             3.48079,
    //             6.44789
    //         ],
    //         [
    //             3.4766,
    //             6.44788
    //         ],
    //         [
    //             3.47308,
    //             6.44789
    //         ],
    //         [
    //             3.4705,
    //             6.44789
    //         ],
    //         [
    //             3.46956,
    //             6.44789
    //         ],
    //         [
    //             3.46909,
    //             6.44786
    //         ],
    //         [
    //             3.46751,
    //             6.44769
    //         ],
    //         [
    //             3.46501,
    //             6.44733
    //         ],
    //         [
    //             3.46141,
    //             6.44684
    //         ],
    //         [
    //             3.4614,
    //             6.44689
    //         ],
    //         [
    //             3.46134,
    //             6.44697
    //         ],
    //         [
    //             3.46126,
    //             6.44702
    //         ],
    //         [
    //             3.46116,
    //             6.44703
    //         ],
    //         [
    //             3.46109,
    //             6.44701
    //         ],
    //         [
    //             3.46074,
    //             6.44749
    //         ],
    //         [
    //             3.46057,
    //             6.4477
    //         ],
    //         [
    //             3.46027,
    //             6.44796
    //         ],
    //         [
    //             3.45953,
    //             6.44848
    //         ],
    //         [
    //             3.4576,
    //             6.44982
    //         ],
    //         [
    //             3.45698,
    //             6.45008
    //         ],
    //         [
    //             3.4564,
    //             6.45022
    //         ],
    //         [
    //             3.45573,
    //             6.45027
    //         ],
    //         [
    //             3.45442,
    //             6.45015
    //         ],
    //         [
    //             3.44999,
    //             6.44973
    //         ],
    //         [
    //             3.44954,
    //             6.4497
    //         ],
    //         [
    //             3.44937,
    //             6.44976
    //         ],
    //         [
    //             3.44925,
    //             6.44984
    //         ],
    //         [
    //             3.4491,
    //             6.44983
    //         ],
    //         [
    //             3.44899,
    //             6.44971
    //         ],
    //         [
    //             3.44899,
    //             6.44955
    //         ],
    //         [
    //             3.4491,
    //             6.44943
    //         ],
    //         [
    //             3.44914,
    //             6.44941
    //         ],
    //         [
    //             3.44929,
    //             6.44943
    //         ],
    //         [
    //             3.44935,
    //             6.44948
    //         ],
    //         [
    //             3.44939,
    //             6.44955
    //         ],
    //         [
    //             3.4496,
    //             6.44962
    //         ],
    //         [
    //             3.45125,
    //             6.44977
    //         ],
    //         [
    //             3.4551,
    //             6.45014
    //         ],
    //         [
    //             3.45582,
    //             6.45018
    //         ],
    //         [
    //             3.45618,
    //             6.45017
    //         ],
    //         [
    //             3.45654,
    //             6.45012
    //         ],
    //         [
    //             3.45701,
    //             6.44999
    //         ],
    //         [
    //             3.45738,
    //             6.44984
    //         ],
    //         [
    //             3.45772,
    //             6.44965
    //         ],
    //         [
    //             3.45917,
    //             6.44863
    //         ],
    //         [
    //             3.46047,
    //             6.44768
    //         ],
    //         [
    //             3.46087,
    //             6.44718
    //         ],
    //         [
    //             3.46101,
    //             6.44696
    //         ],
    //         [
    //             3.46098,
    //             6.44692
    //         ],
    //         [
    //             3.46095,
    //             6.44683
    //         ],
    //         [
    //             3.46096,
    //             6.4467
    //         ],
    //         [
    //             3.46103,
    //             6.4466
    //         ],
    //         [
    //             3.46111,
    //             6.44656
    //         ],
    //         [
    //             3.46121,
    //             6.44655
    //         ],
    //         [
    //             3.4613,
    //             6.44659
    //         ],
    //         [
    //             3.46137,
    //             6.44666
    //         ],
    //         [
    //             3.46142,
    //             6.44681
    //         ],
    //         [
    //             3.46134,
    //             6.44697
    //         ],
    //         [
    //             3.46126,
    //             6.44702
    //         ],
    //         [
    //             3.46116,
    //             6.44703
    //         ],
    //         [
    //             3.46109,
    //             6.44701
    //         ],
    //         [
    //             3.46074,
    //             6.44749
    //         ],
    //         [
    //             3.46057,
    //             6.4477
    //         ],
    //         [
    //             3.46027,
    //             6.44796
    //         ],
    //         [
    //             3.45953,
    //             6.44848
    //         ],
    //         [
    //             3.4585,
    //             6.44921
    //         ],
    //         [
    //             3.4576,
    //             6.44982
    //         ],
    //         [
    //             3.45698,
    //             6.45008
    //         ],
    //         [
    //             3.4564,
    //             6.45022
    //         ],
    //         [
    //             3.45605,
    //             6.45026
    //         ],
    //         [
    //             3.45573,
    //             6.45027
    //         ],
    //         [
    //             3.45514,
    //             6.45022
    //         ],
    //         [
    //             3.45287,
    //             6.45
    //         ],
    //         [
    //             3.45071,
    //             6.4498
    //         ],
    //         [
    //             3.44999,
    //             6.44973
    //         ],
    //         [
    //             3.44954,
    //             6.4497
    //         ],
    //         [
    //             3.44937,
    //             6.44976
    //         ],
    //         [
    //             3.44932,
    //             6.44981
    //         ],
    //         [
    //             3.44929,
    //             6.44983
    //         ],
    //         [
    //             3.44926,
    //             6.44996
    //         ],
    //         [
    //             3.44925,
    //             6.4506
    //         ],
    //         [
    //             3.44911,
    //             6.45204
    //         ],
    //         [
    //             3.44896,
    //             6.45239
    //         ],
    //         [
    //             3.44877,
    //             6.45265
    //         ],
    //         [
    //             3.44761,
    //             6.4536
    //         ],
    //         [
    //             3.44745,
    //             6.45375
    //         ],
    //         [
    //             3.44724,
    //             6.45403
    //         ],
    //         [
    //             3.44647,
    //             6.45525
    //         ],
    //         [
    //             3.44623,
    //             6.45555
    //         ],
    //         [
    //             3.4458,
    //             6.4559
    //         ],
    //         [
    //             3.44541,
    //             6.45608
    //         ],
    //         [
    //             3.44519,
    //             6.45615
    //         ],
    //         [
    //             3.44493,
    //             6.45618
    //         ],
    //         [
    //             3.44461,
    //             6.45614
    //         ],
    //         [
    //             3.44431,
    //             6.45603
    //         ],
    //         [
    //             3.44344,
    //             6.45553
    //         ],
    //         [
    //             3.44257,
    //             6.45504
    //         ],
    //         [
    //             3.44202,
    //             6.45477
    //         ],
    //         [
    //             3.44133,
    //             6.45456
    //         ],
    //         [
    //             3.44085,
    //             6.45449
    //         ],
    //         [
    //             3.44032,
    //             6.45449
    //         ],
    //         [
    //             3.43977,
    //             6.45458
    //         ],
    //         [
    //             3.43921,
    //             6.45476
    //         ],
    //         [
    //             3.43891,
    //             6.45487
    //         ],
    //         [
    //             3.4385,
    //             6.45512
    //         ],
    //         [
    //             3.43821,
    //             6.45535
    //         ],
    //         [
    //             3.43637,
    //             6.45765
    //         ],
    //         [
    //             3.43586,
    //             6.45828
    //         ],
    //         [
    //             3.43568,
    //             6.45861
    //         ],
    //         [
    //             3.43561,
    //             6.45893
    //         ],
    //         [
    //             3.43562,
    //             6.4592
    //         ],
    //         [
    //             3.43559,
    //             6.45932
    //         ],
    //         [
    //             3.4356,
    //             6.45935
    //         ],
    //         [
    //             3.4356,
    //             6.45941
    //         ],
    //         [
    //             3.43557,
    //             6.45945
    //         ],
    //         [
    //             3.43551,
    //             6.45946
    //         ],
    //         [
    //             3.4353,
    //             6.45953
    //         ],
    //         [
    //             3.43335,
    //             6.46028
    //         ],
    //         [
    //             3.43212,
    //             6.46072
    //         ],
    //         [
    //             3.43048,
    //             6.46131
    //         ],
    //         [
    //             3.42898,
    //             6.46184
    //         ],
    //         [
    //             3.42855,
    //             6.46195
    //         ],
    //         [
    //             3.42733,
    //             6.46241
    //         ],
    //         [
    //             3.42682,
    //             6.4626
    //         ],
    //         [
    //             3.42563,
    //             6.46302
    //         ],
    //         [
    //             3.42408,
    //             6.46353
    //         ],
    //         [
    //             3.42335,
    //             6.46371
    //         ],
    //         [
    //             3.42247,
    //             6.46379
    //         ],
    //         [
    //             3.42171,
    //             6.46377
    //         ],
    //         [
    //             3.42082,
    //             6.46364
    //         ],
    //         [
    //             3.42004,
    //             6.46343
    //         ],
    //         [
    //             3.41957,
    //             6.46328
    //         ],
    //         [
    //             3.41841,
    //             6.46285
    //         ],
    //         [
    //             3.41718,
    //             6.46224
    //         ],
    //         [
    //             3.416,
    //             6.46156
    //         ],
    //         [
    //             3.41199,
    //             6.4589
    //         ],
    //         [
    //             3.41044,
    //             6.45791
    //         ],
    //         [
    //             3.41026,
    //             6.45782
    //         ],
    //         [
    //             3.40989,
    //             6.45768
    //         ],
    //         [
    //             3.40955,
    //             6.45759
    //         ],
    //         [
    //             3.40926,
    //             6.45755
    //         ],
    //         [
    //             3.40869,
    //             6.45755
    //         ],
    //         [
    //             3.40816,
    //             6.45757
    //         ],
    //         [
    //             3.40725,
    //             6.45763
    //         ],
    //         [
    //             3.40668,
    //             6.45777
    //         ],
    //         [
    //             3.40628,
    //             6.45793
    //         ],
    //         [
    //             3.40603,
    //             6.45796
    //         ],
    //         [
    //             3.40526,
    //             6.45824
    //         ],
    //         [
    //             3.40483,
    //             6.45833
    //         ],
    //         [
    //             3.40399,
    //             6.45842
    //         ],
    //         [
    //             3.40237,
    //             6.45853
    //         ],
    //         [
    //             3.4013,
    //             6.45867
    //         ],
    //         [
    //             3.40028,
    //             6.45894
    //         ],
    //         [
    //             3.39924,
    //             6.45936
    //         ],
    //         [
    //             3.39916,
    //             6.45946
    //         ],
    //         [
    //             3.39899,
    //             6.45956
    //         ],
    //         [
    //             3.3988,
    //             6.45972
    //         ],
    //         [
    //             3.39854,
    //             6.46001
    //         ],
    //         [
    //             3.39817,
    //             6.46065
    //         ],
    //         [
    //             3.39767,
    //             6.46171
    //         ],
    //         [
    //             3.39739,
    //             6.46221
    //         ],
    //         [
    //             3.3971,
    //             6.46267
    //         ],
    //         [
    //             3.39657,
    //             6.46339
    //         ],
    //         [
    //             3.39645,
    //             6.46356
    //         ],
    //         [
    //             3.39595,
    //             6.46408
    //         ],
    //         [
    //             3.39531,
    //             6.46461
    //         ],
    //         [
    //             3.39492,
    //             6.4649
    //         ],
    //         [
    //             3.39441,
    //             6.4652
    //         ],
    //         [
    //             3.39351,
    //             6.46558
    //         ],
    //         [
    //             3.39318,
    //             6.46568
    //         ],
    //         [
    //             3.39265,
    //             6.4658
    //         ],
    //         [
    //             3.39171,
    //             6.46594
    //         ],
    //         [
    //             3.3911,
    //             6.46598
    //         ],
    //         [
    //             3.39009,
    //             6.46592
    //         ],
    //         [
    //             3.3893,
    //             6.46583
    //         ],
    //         [
    //             3.3887,
    //             6.46571
    //         ],
    //         [
    //             3.38811,
    //             6.46554
    //         ],
    //         [
    //             3.38788,
    //             6.46554
    //         ],
    //         [
    //             3.38742,
    //             6.46539
    //         ],
    //         [
    //             3.38683,
    //             6.46516
    //         ],
    //         [
    //             3.38642,
    //             6.46513
    //         ],
    //         [
    //             3.38607,
    //             6.46522
    //         ],
    //         [
    //             3.38587,
    //             6.46537
    //         ],
    //         [
    //             3.38571,
    //             6.46558
    //         ],
    //         [
    //             3.38562,
    //             6.46573
    //         ],
    //         [
    //             3.38553,
    //             6.46583
    //         ],
    //         [
    //             3.38549,
    //             6.46584
    //         ],
    //         [
    //             3.38516,
    //             6.46648
    //         ],
    //         [
    //             3.38435,
    //             6.46805
    //         ],
    //         [
    //             3.38378,
    //             6.46911
    //         ],
    //         [
    //             3.38355,
    //             6.46933
    //         ],
    //         [
    //             3.38338,
    //             6.4694
    //         ],
    //         [
    //             3.38316,
    //             6.46943
    //         ],
    //         [
    //             3.38289,
    //             6.46937
    //         ],
    //         [
    //             3.38192,
    //             6.46896
    //         ],
    //         [
    //             3.38151,
    //             6.46882
    //         ],
    //         [
    //             3.38101,
    //             6.4688
    //         ],
    //         [
    //             3.38036,
    //             6.4689
    //         ],
    //         [
    //             3.37947,
    //             6.4691
    //         ],
    //         [
    //             3.37914,
    //             6.46921
    //         ],
    //         [
    //             3.37872,
    //             6.4694
    //         ],
    //         [
    //             3.37828,
    //             6.46966
    //         ],
    //         [
    //             3.3782,
    //             6.46973
    //         ],
    //         [
    //             3.37809,
    //             6.46993
    //         ],
    //         [
    //             3.37813,
    //             6.47023
    //         ],
    //         [
    //             3.37823,
    //             6.47047
    //         ],
    //         [
    //             3.37839,
    //             6.47063
    //         ],
    //         [
    //             3.37856,
    //             6.47102
    //         ],
    //         [
    //             3.3786,
    //             6.47126
    //         ],
    //         [
    //             3.37856,
    //             6.47146
    //         ],
    //         [
    //             3.37851,
    //             6.4716
    //         ],
    //         [
    //             3.37837,
    //             6.4718
    //         ],
    //         [
    //             3.3782,
    //             6.47195
    //         ],
    //         [
    //             3.37801,
    //             6.47202
    //         ],
    //         [
    //             3.37775,
    //             6.47205
    //         ],
    //         [
    //             3.37753,
    //             6.47206
    //         ],
    //         [
    //             3.37726,
    //             6.47213
    //         ],
    //         [
    //             3.37715,
    //             6.47222
    //         ],
    //         [
    //             3.37698,
    //             6.47244
    //         ],
    //         [
    //             3.37685,
    //             6.47277
    //         ],
    //         [
    //             3.37673,
    //             6.47299
    //         ],
    //         [
    //             3.37638,
    //             6.47385
    //         ],
    //         [
    //             3.37603,
    //             6.47449
    //         ],
    //         [
    //             3.37547,
    //             6.4753
    //         ],
    //         [
    //             3.37527,
    //             6.47555
    //         ],
    //         [
    //             3.37461,
    //             6.47623
    //         ],
    //         [
    //             3.37313,
    //             6.47739
    //         ],
    //         [
    //             3.37146,
    //             6.4787
    //         ],
    //         [
    //             3.37142,
    //             6.47876
    //         ],
    //         [
    //             3.37082,
    //             6.47933
    //         ],
    //         [
    //             3.36988,
    //             6.48017
    //         ],
    //         [
    //             3.36962,
    //             6.48041
    //         ],
    //         [
    //             3.36942,
    //             6.48066
    //         ],
    //         [
    //             3.36938,
    //             6.48088
    //         ],
    //         [
    //             3.36946,
    //             6.48107
    //         ],
    //         [
    //             3.36954,
    //             6.4812
    //         ],
    //         [
    //             3.36954,
    //             6.48135
    //         ],
    //         [
    //             3.36946,
    //             6.48173
    //         ],
    //         [
    //             3.36926,
    //             6.48175
    //         ],
    //         [
    //             3.36915,
    //             6.48176
    //         ],
    //         [
    //             3.36899,
    //             6.48174
    //         ],
    //         [
    //             3.36886,
    //             6.48161
    //         ],
    //         [
    //             3.36863,
    //             6.4814
    //         ],
    //         [
    //             3.36783,
    //             6.48108
    //         ],
    //         [
    //             3.36705,
    //             6.48085
    //         ],
    //         [
    //             3.36655,
    //             6.4807
    //         ],
    //         [
    //             3.36647,
    //             6.48069
    //         ],
    //         [
    //             3.36623,
    //             6.48067
    //         ],
    //         [
    //             3.36587,
    //             6.48069
    //         ],
    //         [
    //             3.36443,
    //             6.48106
    //         ],
    //         [
    //             3.36347,
    //             6.48151
    //         ],
    //         [
    //             3.36308,
    //             6.48167
    //         ],
    //         [
    //             3.36287,
    //             6.48168
    //         ],
    //         [
    //             3.36248,
    //             6.48161
    //         ],
    //         [
    //             3.36114,
    //             6.48129
    //         ],
    //         [
    //             3.36007,
    //             6.48113
    //         ],
    //         [
    //             3.3598,
    //             6.48104
    //         ],
    //         [
    //             3.35964,
    //             6.48095
    //         ],
    //         [
    //             3.35934,
    //             6.4814
    //         ],
    //         [
    //             3.35814,
    //             6.48303
    //         ],
    //         [
    //             3.35694,
    //             6.48459
    //         ],
    //         [
    //             3.35348,
    //             6.48914
    //         ],
    //         [
    //             3.35304,
    //             6.48971
    //         ],
    //         [
    //             3.353,
    //             6.48977
    //         ],
    //         [
    //             3.35289,
    //             6.48971
    //         ],
    //         [
    //             3.35225,
    //             6.48939
    //         ],
    //         [
    //             3.35122,
    //             6.4889
    //         ],
    //         [
    //             3.35104,
    //             6.48884
    //         ],
    //         [
    //             3.35071,
    //             6.48877
    //         ],
    //         [
    //             3.34938,
    //             6.48872
    //         ],
    //         [
    //             3.34868,
    //             6.48867
    //         ],
    //         [
    //             3.34865,
    //             6.48876
    //         ],
    //         [
    //             3.34867,
    //             6.48948
    //         ],
    //         [
    //             3.34867,
    //             6.49053
    //         ],
    //         [
    //             3.34866,
    //             6.49118
    //         ],
    //         [
    //             3.34863,
    //             6.49263
    //         ]
    //     ]
    // },
    // bounds: {
    //     northeast: {
    //         lat: 6.4926251,
    //         lng: 3.5648897
    //     },
    //     southwest: {
    //         lat: 6.4331044,
    //         lng: 3.3486307
    //     }
    // },
    // duration_value: 3592,
    // distance_value: 34088,
    // duration: '60 mins',
    // distance: '34.09 km',
    start_location: ref({}),
    end_location: ref({}),
    itineraries: [
        {
            id: 1,
            time: ref(''),
            fare: ref()
        }
    ],
    route_availability_end_date: ref(''),
    route_availability_start_date: ref(''),
    blacklisted_availability_days: ref([])
}
const loading = ref(false)
export const useCreateRoute = () => {
	const createRoute = async () => {
		loading.value = true
		const res = await routes_api.$_create_route(convertObjWithRefToObj(createForm)) as CustomAxiosResponse
		if (res.type !== 'ERROR') {
            useAlert().openAlert({
				type: 'SUCCESS',
				msg: 'Route was created successfully'
			})
		}
		loading.value = false
	}
	return { loading, createForm, createRoute }
}
