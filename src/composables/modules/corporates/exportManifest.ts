import { corporates_api, CustomAxiosResponse } from '@/api_factory/modules'
import { useCorporateIdDetails } from '@/composables/modules/corporates/id'
import { convertObjWithRefToObj } from '@/composables/utils/formatter'
import { useAlert } from '@/composables/core/notification'
import { useCompaniesModal } from '@/composables/core/modals'
import { useFileDownloadFromUrl } from '@/composables/utils/downloadFile'
const { downloadFile } = useFileDownloadFromUrl()
const { selectedCorporate } = useCorporateIdDetails()

const corporateRouteManifestExportForm = {
    start_date: ref(''),
    end_date: ref('')
}

export const useExportCorporateRouteManifest = () => {
const loading = ref(false)
const exportCorporateRouteManifest = async () => {
    loading.value = true
    const res = (await corporates_api.$_corporate_route_manifest(
        Number(selectedCorporate.value.id), convertObjWithRefToObj(corporateRouteManifestExportForm))) as CustomAxiosResponse
    if (res.type !== 'ERROR') {
        useAlert().openAlert({
            type: 'SUCCESS',
            msg: 'Corporate route manifest was exported successfully'
          })
          useCompaniesModal().closeCorporateManifestExport()
          downloadFile(res.data.url, 'Corporate Manifest')
    }
    loading.value = false
}

const populateRouteManifestExportForm = (data:any) => {
    corporateRouteManifestExportForm.start_date.value = data.start_date
    corporateRouteManifestExportForm.end_date.value = data.end_date
}
return { populateRouteManifestExportForm, exportCorporateRouteManifest, loading, corporateRouteManifestExportForm }
}
