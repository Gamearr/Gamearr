using NzbDrone.Core.Profiles.Qualities;
using Gamearr.Http;

namespace Gamearr.Api.V1.Profiles.Quality
{
    public class QualityProfileSchemaModule : GamearrRestModule<QualityProfileResource>
    {
        private readonly IProfileService _profileService;

        public QualityProfileSchemaModule(IProfileService profileService)
            : base("/qualityprofile/schema")
        {
            _profileService = profileService;
            GetResourceSingle = GetSchema;
        }

        private QualityProfileResource GetSchema()
        {
            QualityProfile qualityProfile = _profileService.GetDefaultProfile(string.Empty);


            return qualityProfile.ToResource();
        }
    }
}
