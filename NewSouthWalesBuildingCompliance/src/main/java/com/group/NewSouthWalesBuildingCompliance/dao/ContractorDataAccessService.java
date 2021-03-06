package com.group.NewSouthWalesBuildingCompliance.dao;

import com.group.NewSouthWalesBuildingCompliance.model.Contractor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository("postGres")
public class ContractorDataAccessService implements ContractorDao {
    
    @Override
    public int insertContractor(Contractor contractor) {
        return 0;
    }

    @Override
    public List<Contractor> selectAllContractors() {
        return List.of(new Contractor(
                "PostGres",
                "PostGres",
                "PostGres",
                "PostGres",
                "PostGres",
                "PostGres",
                "PostGres",
                "PostGres",
                "PostGres",
                "PostGres",
                "PostGres"
        ));
    }

    @Override
    public Optional<Contractor> selectContractorByID(String licenceID) {
        return Optional.empty();
    }

    @Override
    public int deleteContractorByID(String licenceID) {
        return 0;
    }

    @Override
    public int updateContractorByID(String licenceID, Contractor contractor) {
        return 0;
    }

}
